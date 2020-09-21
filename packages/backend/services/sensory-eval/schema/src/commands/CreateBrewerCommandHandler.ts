import {ICommandHandler, CreateBrewerCommand} from '.'
import {Producer} from 'kafka-node'
import {BrewerCreatedEvent} from '../events'
import {Brewer} from '../types'

export class CreateBrewerCommandHandler implements ICommandHandler<CreateBrewerCommand, Brewer> {
  private producer: Producer

  constructor(producer: Producer) {
    console.log({producer})
    this.producer = producer
  }

  public async handle(command: CreateBrewerCommand) {
    // Validation goes here
    const brewer = {
      id: 'test-id',
      name: command.name,
    }

    const brewerCreatedEvent = new BrewerCreatedEvent(brewer)

    return new Promise<Brewer>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(brewerCreatedEvent), topic: 'brewers'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(brewer)
        }
      })
    })
  }
}
