import {KafkaClient, Consumer} from 'kafka-node'
import {AccountDocument} from '../../models'
import {IAccountsProjection} from './IAccountsProjection'
import {IListDocumentsArgs} from '@luminate/mongo-utils'
import {Account, AccountConnection} from '../../../types'
import {EventType} from '../../../domain/EventType'
import {IAccountCreatedEvent, IAccountUpdatedEvent, AccountDeletedEvent} from '../../../domain/account/events'

export class AccountsProjection implements IAccountsProjection {
  private client: KafkaClient

  private accounts: AccountDocument[] = []

  constructor() {
    this.client = new KafkaClient({
      kafkaHost: process.env.KAFKA_HOST || 'http://localhost:9092',
      autoConnect: true,
      connectTimeout: 1000,
    })

    const accountsConsumer = new Consumer(this.client, [{topic: 'accounts', offset: 0}], {
      fromOffset: true,
    })

    accountsConsumer.on('message', message => {
      const data = JSON.parse(message.value as string)
      switch (data.event) {
        case EventType.ACCOUNT_CREATED_EVENT: {
          this.accountCreatedEventHandler(data)
          break
        }

        case EventType.ACCOUNT_UPDATED_EVENT: {
          this.accountUpdatedEventHandler(data)
          break
        }

        case EventType.ACCOUNT_DELETED_EVENT: {
          this.accountDeletedEventHandler(data)
          break
        }
      }
    })
  }

  private accountCreatedEventHandler(message: IAccountCreatedEvent) {
    const {id, ...account} = message.data
    // @ts-ignore
    this.accounts.push({id, ...account})
  }

  private accountUpdatedEventHandler(event: IAccountUpdatedEvent) {
    const {id, ...updatedAccount} = event.data
    // @ts-ignore
    this.accounts = this.accounts.map(account => (account.id === id ? {...account, ...updatedAccount} : account))
  }

  private accountDeletedEventHandler(event: AccountDeletedEvent) {
    const {id} = event.data
    this.accounts = this.accounts.filter(account => account.id !== id)
  }

  public async getConnectionResults(args: IListDocumentsArgs) {
    return Promise.resolve({
      pageInfo: {
        hasNextPage: false,
        prevCursor: '',
        nextCursor: '',
      },
      // needs to convert userId in account object to user object either here or in a loader
      edges: this.accounts.map(account => ({node: (account as unknown) as Account, cursor: ''})),
    }) as Promise<AccountConnection>
  }

  public async listAccounts(args?: any) {
    if (!args) {
      return this.accounts
    }
    // TODO: add use cases outside of filtering on id(s)
    return this.accounts.filter(account =>
      Array.isArray(args.id) ? args.id.includes(account.id) : args.id === account.id,
    )
  }

  public async getAccount(id: string) {
    return this.accounts.find(account => account.id === id)
  }

  public async getAccountByName(name: string) {
    return this.accounts.find(account => account.name === name)
  }
}
