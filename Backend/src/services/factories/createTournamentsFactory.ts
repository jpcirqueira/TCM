import { ServiceCreator } from '../creator/serviceCreator'
import { Service } from '../protocols/IServices'
import { CreatePlayoffService } from '../tournaments/createPlayoff'

export class CreatePlayoffFactory extends ServiceCreator {
  public factoryMethod(): Service {
    return new CreatePlayoffService()
  }
}
