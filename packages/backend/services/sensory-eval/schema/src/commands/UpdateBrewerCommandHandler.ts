import {ICommandHandler, UpdateBrewerCommand} from '.'
import {Producer} from 'kafka-node'
import {BrewerUpdatedEvent} from '../events'
import {Brewer} from '../types'

export class UpdateBrewerCommandHandler implements ICommandHandler<UpdateBrewerCommand, Brewer> {
  private producer: Producer

  constructor(producer: Producer) {
    this.producer = producer
  }

  public async handle(command: UpdateBrewerCommand) {
    // Validation goes here
    const brewer = {
      id: command.id,
      name: command.name,
    }

    const brewerUpdatedEvent = new BrewerUpdatedEvent(brewer)

    return new Promise<Brewer>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(brewerUpdatedEvent), topic: 'brewers'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(brewer)
        }
      })
    })
  }
}
