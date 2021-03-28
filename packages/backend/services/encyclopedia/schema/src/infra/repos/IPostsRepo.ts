import {PostDocument} from '../models'
import {IRepo} from './IRepo'

export interface IPostsRepo extends IRepo<PostDocument> {}
