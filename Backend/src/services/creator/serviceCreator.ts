import { Request } from 'express'
import { Result, Service } from '../protocols/IServices'

export abstract class ServiceCreator {
  public abstract factoryMethod(): Service

  public async execute(request: Request): Promise<Result> {
    const product = this.factoryMethod()
    return product.execute(request)
  }
}
