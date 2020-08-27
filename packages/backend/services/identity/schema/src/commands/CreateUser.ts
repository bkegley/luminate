import {ICommand} from './ICommand'
import {Producer} from 'kafka-node'
import {IMessage} from './IMessage'

interface User {
  id: string
  username: string
}

export class CreateUserCommand implements ICommand<User> {
  private producer: Producer

  constructor(producer: Producer) {
    this.producer = producer
  }

  public async execute(data: User) {
    const message: IMessage<User> = {
      timestamp: new Date(),
      event: 'UserCreatedEvent',
      data,
    }

    return new Promise<boolean>((resolve, reject) => {
      this.producer.send([{messages: JSON.stringify(message), topic: 'users'}], (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
  }
}
