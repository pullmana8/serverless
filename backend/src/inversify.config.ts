import 'reflect-metadata'
import { Container } from 'inversify'

const container = new Container()
container.bind<Dynamo>(TYPES.Dynamo).to(Dynamo)