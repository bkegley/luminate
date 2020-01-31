import mongoose from 'mongoose'
import extendSchema from '../extendSchema'
import Role from './Role'
import bcrypt from 'bcrypt'
const saltRounds = 10
import {DocumentWithTimestamps} from '@luminate/graphql-utils'
import {ScopeDocument} from './Scope'

export interface PersonDocument extends DocumentWithTimestamps {
  firstName?: string
  lastName?: string
  email?: Array<IEmail>
  phone?: Array<IPhone>
  type: ['user' | 'contact' | 'person']
}

export interface UserDocument extends PersonDocument {
  username: string
  password: string
  authTokens?: Array<IAuthToken>
  accounts?: Array<mongoose.Types.ObjectId>
  roles?: string[]
  lastLoggedIn?: Date
}

export interface UserWithScopesDocument extends UserDocument {
  scopes?: ScopeDocument[]
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
      required: true,
    },
    password: {
      type: String,
      required: true,
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
    accounts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
      },
    ],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
      },
    ],
    lastLoggedIn: {
      type: Date,
    },
  },
  {timestamps: true},
)

UserSchema.pre<UserDocument>('save', async function(next) {
  if (this.password) {
    const hashedPassword = await bcrypt.hash(this.password, saltRounds).then(res => res)
    this.password = hashedPassword
  }
  next()
})

export const Person = mongoose.model<PersonDocument>('person', PersonSchema, 'people')
export const User = mongoose.model<UserDocument>('user', UserSchema, 'people')
