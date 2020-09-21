import {ICommandHandler, CreateBrewerCommand} from '.'
import {Producer} from 'kafka-node'
import {BrewerCreatedEvent} from '../events'
import {Brewer} from '../types'
import {BrewerAggregate} from '../aggregates'

export class CreateBrewerCommandHandler implements ICommandHandler<CreateBrewerCommand, Brewer> {
  private producer: Producer

  constructor(producer: Producer) {
    this.producer = producer
  }

  public async handle(command: CreateBrewerCommand) {
    const existingBrewer = await BrewerAggregate.findOne({name: command.name})

    if (existingBrewer) {
      throw new Error('Brewer already exists')
    }

    const brewer = new BrewerAggregate(command)
    await brewer.save()

    const brewerCreatedEvent = new BrewerCreatedEvent(brewer.toObject({getters: true}))

    return new Promise<Brewer>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(brewerCreatedEvent), topic: 'brewers'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(brewer.toObject({getters: true}))
        }
      })
    })
  }
}
