import { Router, Request, Response } from 'express'
import { ListMatchsRoundController } from '../controllers/round/listMatchsRoundController'
import userAuth from '../middlewares/userAuth'

const roundRoutes = Router()

roundRoutes.get(
  '/round/:id',
  userAuth,
  async (request: Request, response: Response) => {
    const list = new ListMatchsRoundController()
    await list.handle(request, response)
  },
)

export default roundRoutes
