import { Request, Response } from 'express'
import db from '../db/connection'

export default function ConnectionsController() {
    return {
        async getAll(req: Request, res: Response) {
            const totalConnections = await db('connections').count('* as total')

            const [{total}] = totalConnections

            return res.json({
                total
            })
        },
        async create(req: Request, res: Response) {
            const {
                user_id
            } = req.body

            await db('connections').insert({
                user_id
            })

            return res.status(201).send()
        }
    }
}