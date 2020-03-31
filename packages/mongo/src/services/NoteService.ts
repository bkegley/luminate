import {NoteModel, NoteDocument} from '../models/Note'
import {IListDocumentsArgs} from '../abstract/types'
import {AuthenticatedService} from '../abstract/AuthenticatedService'

export class NoteService extends AuthenticatedService<NoteDocument> {
  constructor() {
    super(NoteModel)
  }

  // public find(conditions) {
  //   return
  // }

  // public findOne(conditions) {}

  // public findById(id) {}

  // public getConnection() {}

  public listNotes(args: IListDocumentsArgs) {
    return this.getConnectionResults(args)
  }
}
