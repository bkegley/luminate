import mongoose from 'mongoose'
import extendSchema from '../extendSchema'
import bcrypt from 'bcrypt'
const saltRounds = 10
import {DocumentWithTimestamps} from '@luminate/graphql-utils'
import {BaseAuthenticatedSchema, AuthenticatedEntity, WithAuthenticatedMethods} from '../baseSchemas'
import {AccountDocument} from './Account'
import {RoleDocument} from './Role'

export interface PersonDocument extends DocumentWithTimestamps {
  firstName?: string
  lastName?: string
  email?: Array<IEmail>
  phone?: Array<IPhone>
  type: ['user' | 'contact' | 'person']
}

export interface PersonModel extends WithAuthenticatedMethods<PersonDocument> {}

interface BaseUserDocument extends PersonDocument {
  username: string
  password: string
  defaultAccount?: mongoose.Types.ObjectId
  scopes: string[]
  lastLoggedIn?: Date
}
export interface UserDocument extends BaseUserDocument {
  accounts?: Array<mongoose.Types.ObjectId>
  roles?: UserRole[]
}

export interface UserModel extends WithAuthenticatedMethods<UserDocument> {}

interface UserRole {
  account: mongoose.Types.ObjectId | string
  roles: Array<mongoose.Types.ObjectId | string>
}

export interface AuthenticatedUserDocument extends BaseUserDocument {
  account?: AccountDocument | undefined
  accounts?: AccountDocument[] | undefined
  roles?: RoleDocument[]
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

const PersonSchema = extendSchema(
  BaseAuthenticatedSchema,
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
    accounts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account',
      },
    ],
    defaultAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'account',
    },
    roles: [
      {
        account: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'account',
        },
        roles: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'role',
          },
        ],
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

PersonSchema.loadClass(AuthenticatedEntity)
UserSchema.loadClass(AuthenticatedEntity)

export const Person = mongoose.model<PersonDocument, PersonModel>('person', PersonSchema, 'people')
export const User = mongoose.model<UserDocument, UserModel>('user', UserSchema, 'people')
