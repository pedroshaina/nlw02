import { Request, Response } from 'express'

import db from '../db/connection'
import hoursToMinutes from '../util/hoursToMinutes'

export default function ClassesController() {
    return {
        async getAll(req: Request, res: Response) {
            const filter: any = req.query

            if (!filter.week_day || !filter.subject || !filter.time) {
                return res.status(400).json({
                    error: 'Missing required filters'
                })
            }

            const timeInMinutes = hoursToMinutes(filter.time)

            const classes = await db('classes')
                .whereExists(function() {
                    this.select('class_schedule.*')
                        .from('class_schedule')
                        .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                        .whereRaw('`class_schedule`.`week_day` = ??', [Number(filter.week_day)])
                        .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                        .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
                })
                .where('classes.subject', '=', filter.subject)
                .join('users', 'classes.user_id', '=', 'users.id')
                .select(['classes.*', 'users.*'])
            
            return res.json(classes)
        },
        async create(req: Request, res: Response) {

            const {
                name,
                avatar,
                whatsapp,
                bio,
                subject,
                cost,
                schedule
            } = req.body
            
            const tx = await db.transaction()
        
            try {
                const insertedUsersIds = await tx('users').insert({
                    name,
                    avatar,
                    whatsapp,
                    bio
                })
            
                const [firstUserId] = insertedUsersIds
            
                const insertedClassesId = await tx('classes').insert({
                    subject,
                    cost,
                    user_id: firstUserId
                })
            
                const [firstClassId] = insertedClassesId
            
                const schedules = schedule.map((item: any) => {
                    return {
                        week_day: item.week_day,
                        from: hoursToMinutes(item.from),
                        to: hoursToMinutes(item.to),
                        class_id: firstClassId
                    }
                })
            
                await tx('class_schedule').insert(schedules)
            
                await tx.commit()
            
                return res.status(201).send()
            } catch(err) {
                await tx.rollback()
        
                return res.status(500).json({
                    error: 'Unexpected error'
                })
            }

        } 
    }
}