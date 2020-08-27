import {KafkaClient, Consumer} from 'kafka-node'
import {AccountDocument} from '../models'
import {IMessage} from '../commands/IMessage'
import {IAccountsAggregate} from './IAccountsAggregate'
import {IListDocumentsArgs} from '@luminate/mongo-utils'

export class AccountsAggregate implements IAccountsAggregate {
  private client: KafkaClient

  private accounts: AccountDocument[] = []

  constructor(client: KafkaClient) {
    this.client = client

    const accountsConsumer = new Consumer(this.client, [{topic: 'accounts', offset: 0}], {
      fromOffset: true,
    })

    accountsConsumer.on('message', message => {
      const data: IMessage<AccountDocument> = JSON.parse(message.value as string)
      switch (data.event) {
        case 'AccountCreatedEvent': {
          this.accountCreatedEventHandler(data)
        }
      }
    })
  }
  private accountCreatedEventHandler(message: IMessage<AccountDocument>) {
    const {_id, ...account} = message.data
    // @ts-ignore
    this.accounts.push({id: _id, ...account})
  }

  public async getConnectionResults(args: IListDocumentsArgs) {
    return {
      pageInfo: {
        hasNextPage: false,
        previousCursor: '',
        nextCursor: '',
      },
      edges: this.accounts.map(account => ({node: account, cursor: ''})),
    }
  }

  public async listAccounts() {
    return Promise.resolve(this.accounts)
  }

  public async getAccount(id: string) {
    return new Promise<AccountDocument>((resolve, reject) => {
      const account = this.accounts.find(account => account.id === id)
      if (account) {
        resolve(account)
      } else {
        reject('Account not found')
      }
    })
  }
}
