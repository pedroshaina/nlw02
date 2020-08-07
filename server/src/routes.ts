import express from 'express'

import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router()

const classesControllers = ClassesController()
const connectionsController = ConnectionsController()

routes.get('/classes', classesControllers.getAll)
routes.post('/classes', classesControllers.create)

routes.get('/connections', connectionsController.getAll)
routes.post('/connections', connectionsController.create)

export default routes