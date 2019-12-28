import * as mongoose from 'mongoose'
import extendSchema from '../extendSchema'
import Role from './Role'
import bcrypt from 'bcrypt'
import Scope, {IScope} from './Scope'
const saltRounds = 10
import {DocumentWithTimestamps} from '@luminate/graphql-utils'

export interface IPerson extends DocumentWithTimestamps {
  firstName?: string
  lastName?: string
  email?: Array<IEmail>
  phone?: Array<IPhone>
  type: ['user' | 'contact' | 'person']
}

export interface IUser extends IPerson {
  username?: string
  password?: string
  authTokens?: Array<IAuthToken>
  roles?: string[]
  lastLoggedIn?: Date
}

type ContactType = 'work' | 'home' | 'mobile' | 'other'

interface ContactInfo {
  value: string
  primary: boolean
}

interface IEmail extends ContactInfo {
  contactType: Exclude<ContactType, 'mobile'>
}

interface IPhone extends ContactInfo {
  contactType: ContactType
}

interface IAuthToken {
  token: string
  expiresAt: Date
}

const PersonSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: [
      {
        contactType: {
          type: String,
          enum: ['work', 'home', 'other'],
          default: 'work',
        },
        value: {
          type: String,
        },
        primary: {
          type: Boolean,
        },
      },
    ],
    phone: [
      {
        contactType: {
          type: String,
          enum: ['work', 'home', 'mobile', 'other'],
          default: 'work',
        },
        value: {
          type: String,
        },
        primary: {
          type: Boolean,
        },
      },
    ],
    // addresses: [AddressSchema],
    type: [
      {
        type: String,
        enum: ['user', 'contact', 'person'],
        default: ['person'],
      },
    ],
  },
  {timestamps: true},
)

const UserSchema = extendSchema(
  PersonSchema,
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    authTokens: [
      {
        token: {
          type: String,
        },
        expiresAt: {
          type: Date,
        },
      },
    ],
    roles: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'role',
    },
    lastLoggedIn: {
      type: Date,
    },
  },
  {timestamps: true},
)

UserSchema.pre<IUser>('save', async function(next) {
  if (this.password) {
    const hashedPassword = await bcrypt.hash(this.password, saltRounds).then(res => res)
    this.password = hashedPassword
  }
  next()
})

UserSchema.virtual('scopes').get(async function(this: IUser) {
  const roles = await Role.find({_id: this.roles}).populate('scopes')
  console.log({roles})
  return roles.map(role => role.scopes)
})

export const Person = mongoose.model<IPerson>('person', PersonSchema, 'people')
export const User = mongoose.model<IUser>('user', UserSchema, 'people')
