import { ServiceCreator } from '../creator/serviceCreator'
import { Service } from '../protocols/IServices'
import CreateSessionService from '../session/createSessionService'

export class SessionFactory extends ServiceCreator {
  public factoryMethod(): Service {
    return new CreateSessionService()
  }
}
