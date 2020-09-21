import {ICommandHandler, UpdateBrewerCommand} from '.'
import {Producer} from 'kafka-node'
import {BrewerUpdatedEvent} from '../events'
import {Brewer} from '../types'
import {BrewerAggregate} from '../aggregates'

export class UpdateBrewerCommandHandler implements ICommandHandler<UpdateBrewerCommand, Brewer> {
  private producer: Producer

  constructor(producer: Producer) {
    this.producer = producer
  }

  public async handle(command: UpdateBrewerCommand) {
    const [brewerToUpdate, existingBrewerName] = await Promise.all([
      BrewerAggregate.findById(command.id),
      BrewerAggregate.findOne({name: command.name}),
    ])

    if (!brewerToUpdate) {
      throw new Error('Brewer not found')
    }

    if (existingBrewerName) {
      throw new Error('Brewer already exists')
    }

    ;(Object.keys(command) as Array<keyof UpdateBrewerCommand>).forEach(key => {
      brewerToUpdate[key] = command[key]
    })

    await brewerToUpdate.save()

    const brewerUpdatedEvent = new BrewerUpdatedEvent(brewerToUpdate.toObject({getters: true}))

    return new Promise<Brewer>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(brewerUpdatedEvent), topic: 'brewers'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(brewerToUpdate.toObject({getters: true}))
        }
      })
    })
  }
}
