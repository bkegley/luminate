import {NoteModel, NoteDocument} from '../models/Note'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class NoteService extends AuthenticatedService<NoteDocument> {
  constructor() {
    super(NoteModel)
  }

  public findNotes(conditions: any) {
    return this.model.find(conditions)
  }
}
