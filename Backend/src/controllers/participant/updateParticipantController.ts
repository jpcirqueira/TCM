// import { Request, Response } from 'express'
// import UpdateParticipantStatusService from '../../services/participant/updateParticipantStatusService'
// import { Controller } from '../protocols/IController'

// export default class UpdateParticipantStatusController implements Controller {
//   async handle(request: Request, response: Response): Promise<Response> {
//     const update = new UpdateParticipantStatusService()
//     const { body, statusCode } = await update.execute(request)
//     return response.status(statusCode).json(body)
//   }
// }
