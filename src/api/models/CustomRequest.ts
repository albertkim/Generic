import * as Express from 'express'
import {User} from '../models/User'

export interface CustomRequest extends Express.Request {

  user: User

}
