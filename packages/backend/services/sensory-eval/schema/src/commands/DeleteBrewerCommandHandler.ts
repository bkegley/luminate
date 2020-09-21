import {ICommandHandler, DeleteBrewerCommand} from '.'
import {Producer} from 'kafka-node'
import {BrewerDeletedEvent} from '../events'

export class DeleteBrewerCommandHandler implements ICommandHandler<DeleteBrewerCommand, boolean> {
  private producer: Producer

  constructor(producer: Producer) {
    this.producer = producer
  }

  public async handle(command: DeleteBrewerCommand) {
    const brewerDeletedEvent = new BrewerDeletedEvent(command.id)

    return new Promise<boolean>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(brewerDeletedEvent), topic: 'brewers'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
  }
}
