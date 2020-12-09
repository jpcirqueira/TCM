import { Router, Request, Response } from 'express'
import { CreateSessionController } from '../controllers/session/createSessionController'

const sessionRoutes = Router()

sessionRoutes.post('/session', async (request: Request, response: Response) => {
  const CreateSession = new CreateSessionController()
  await CreateSession.handle(request, response)
})

export default sessionRoutes
