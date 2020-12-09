import { ServiceCreator } from '../creator/serviceCreator'
import { Service } from '../protocols/IServices'
import CreateUserService from '../user/createUserService'

export class CreateUserFactory extends ServiceCreator {
  public factoryMethod(): Service {
    return new CreateUserService()
  }
}
