import {
  CuppingSessionModel,
  CuppingSessionDocument,
  ScoreSheetDocument,
  SessionCoffeeDocument,
} from '../infra/models/CuppingSession'
import {AuthenticatedService, Token} from '@luminate/mongo-utils'
import DataLoader from 'dataloader'

interface Loaders {
  byCuppingSessionId?: DataLoader<string, CuppingSessionDocument | null>
}

export class CuppingSessionService extends AuthenticatedService<CuppingSessionDocument> {
  constructor(user: Token | null) {
    super(CuppingSessionModel, user)

    this.loaders.byCuppingSessionId = new DataLoader<string, CuppingSessionDocument | null>(async ids => {
      const cuppingSessions = await this.model.find({_id: ids, ...this.getReadConditionsForUser()})
      return ids.map(
        id => cuppingSessions.find(cuppingSession => cuppingSession._id.toString() === id.toString()) || null,
      )
    })
  }

  private loaders: Loaders = {}

  public async getById(id: string) {
    return this.loaders.byCuppingSessionId?.load(id) || null
  }

  public findCuppingSessions(conditions?: {[x: string]: any}) {
    return this.model.find({...conditions, ...this.getReadConditionsForUser()})
  }

  public updateCuppingSessionCoffees(id: string, sessionCoffees: Array<{sampleNumber: string; coffee: string}>) {
    return this.updateOne({_id: id, locked: false}, {sessionCoffees})
  }

  public lock(id: string) {
    return this.updateOne({_id: id}, {locked: true})
  }

  public async getCuppingSessionCoffee(id: string) {
    const cuppingSession = await this.model.findOne({'sessionCoffees._id': id})
    if (!cuppingSession) return null
    return cuppingSession.sessionCoffees?.find(session => session._id.toString() === id) ?? null
  }

  public async listScoreSheetsBySessionCoffee(sessionCoffeeId: string) {
    const cuppingSession = await this.model.findOne({'sessionCoffees._id': sessionCoffeeId})
    if (!cuppingSession) return null
    const sessionCoffee = cuppingSession.sessionCoffees?.find(session => session._id.toString() === sessionCoffeeId)
    if (!sessionCoffee) return null
    return sessionCoffee.scoreSheets
  }

  public async getScoreSheet(sessionCoffeeId: string, scoreSheetId: string) {
    const scoreSheets = await this.listScoreSheetsBySessionCoffee(sessionCoffeeId)
    return scoreSheets?.find(scoreSheet => scoreSheet._id.toString() === scoreSheetId) ?? null
  }

  public async createScoreSheet({sessionCoffeeId, input}: {sessionCoffeeId: string; input: any}) {
    const updatedCuppingSession = await this.updateOne(
      {'sessionCoffees._id': sessionCoffeeId, locked: true},
      {$push: {'sessionCoffees.$.scoreSheets': input}},
      {new: true},
    )

    if (!updatedCuppingSession) {
      // TODO: assign update query to 'updatedCoffee' and if null build error for either invalid id or non-locked session
      return null
    }

    const sessionCoffee = updatedCuppingSession.sessionCoffees?.find(
      coffee => coffee._id.toString() === sessionCoffeeId,
    )
    return sessionCoffee?.scoreSheets[sessionCoffee.scoreSheets.length - 1] ?? null
  }

  public async updateScoreSheet({
    scoreSheetId,
    sessionCoffeeId,
    input,
  }: {
    scoreSheetId: string
    sessionCoffeeId: string
    input: any
  }) {
    const updatedCuppingSession = await this.updateOne(
      {sessionCoffees: {$elemMatch: {_id: sessionCoffeeId, 'scoreSheets._id': scoreSheetId}}, locked: true},
      {$set: {'sessionCoffees.$[outer].scoreSheets.$[inner]': {_id: scoreSheetId, ...input}}},
      {
        new: true,
        // @ts-ignore
        arrayFilters: [{'outer._id': sessionCoffeeId}, {'inner._id': scoreSheetId}],
      },
    )

    if (!updatedCuppingSession) {
      // TODO: assign update query to 'updatedCoffee' and if null build error for either invalid id or non-locked session
      return null
    }

    return (
      updatedCuppingSession.sessionCoffees
        ?.find((coffee: SessionCoffeeDocument) => coffee._id.toString() === sessionCoffeeId)
        ?.scoreSheets.find((scoreSheet: ScoreSheetDocument) => scoreSheet._id.toString() === scoreSheetId) ?? null
    )
  }

  public deleteScoreSheetById(id: string) {
    return this.updateOne(
      {'sessionCoffees.scoreSheets._id': id, locked: true},
      {$pull: {'sessionCoffees.$.scoreSheets': {_id: id}}},
      {new: true},
    )
  }
}
