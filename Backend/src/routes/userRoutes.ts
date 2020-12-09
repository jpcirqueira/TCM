import { Router, Request, Response } from 'express'

import { CreateUserController } from '../controllers/user/createUserController'
import { SearchMyParticipartionController } from '../controllers/user/searchMyParticipartionController'
import { SearchUserController } from '../controllers/user/searchUserController'
import userAuth from '../middlewares/userAuth'

const userRoutes = Router()

userRoutes.post('/user', async (request: Request, response: Response) => {
  const createUser = new CreateUserController()
  await createUser.handle(request, response)
})
userRoutes.get('/users/:id', async (request: Request, response: Response) => {
  const SearchUser = new SearchUserController()
  await SearchUser.handle(request, response)
})

userRoutes.get(
  '/user/tournaments',
  userAuth,
  async (request: Request, response: Response) => {
    const SearchUser = new SearchMyParticipartionController()
    await SearchUser.handle(request, response)
  },
)

export default userRoutes
