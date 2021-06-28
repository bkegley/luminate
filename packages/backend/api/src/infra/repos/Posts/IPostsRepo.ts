import {IRepo} from '../IRepo'
import {PostDocument} from '../../models'

export interface IPostsRepo extends IRepo<PostDocument> {}
