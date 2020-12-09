import { ServiceCreator } from '../creator/serviceCreator'
import { Service } from '../protocols/IServices'
import SearchByNicknameService from '../user/searchByNicknameService'

export class SearchUserFactory extends ServiceCreator {
  public factoryMethod(): Service {
    return new SearchByNicknameService()
  }
}
