import {NoteModel, NoteDocument} from '../models/Note'
import {AuthenticatedService} from '../abstract/AuthenticatedService'
import DataLoader from 'dataloader'

interface Loaders {
  byNoteId?: DataLoader<string, NoteDocument | null>
  byEntityId?: DataLoader<string, NoteDocument[] | null>
}

export class NoteService extends AuthenticatedService<NoteDocument> {
  constructor() {
    super(NoteModel)

    this.loaders.byNoteId = new DataLoader<string, NoteDocument | null>(async ids => {
      const notes = await this.model.find({_id: ids, ...this.getReadConditionsForUser()})
      return ids.map(id => notes.find(note => note._id.toString() === id.toString()) || null)
    })

    this.loaders.byEntityId = new DataLoader<string, NoteDocument[] | null>(async ids => {
      const notes = await this.model.find({entityId: ids, ...this.getReadConditionsForUser()})
      return ids.map(id => notes.filter(note => note.entityId.toString() === id.toString()) || null)
    })
  }

  private loaders: Loaders = {}

  public listByEntityId(entityId: string) {
    return this.loaders.byEntityId?.load(entityId) || []
  }

  public findNotes(conditions: any) {
    return this.model.find(conditions)
  }
}
