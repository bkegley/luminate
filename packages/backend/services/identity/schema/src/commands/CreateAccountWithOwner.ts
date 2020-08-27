import {ICommand} from './ICommand'
import {Producer} from 'kafka-node'
import {IMessage} from './IMessage'

interface Account {
  id: string
  name: string
}

export class CreateAccountWithOwnerCommand implements ICommand<Account> {
  private producer: Producer

  constructor(producer: Producer) {
    this.producer = producer
  }

  public async execute(data: Account) {
    const message: IMessage<Account> = {
      timestamp: new Date(),
      event: 'AccountCreatedEvent',
      data,
    }

    return new Promise<boolean>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(message), topic: 'accounts'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
  }
}
