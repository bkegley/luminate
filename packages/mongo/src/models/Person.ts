import mongoose from 'mongoose'
import extendSchema from '../utils/extendSchema'
import bcrypt from 'bcrypt'
const saltRounds = 10
import {AuthenticatedDocument} from '../abstract/documents'
import {BaseAuthenticatedSchema} from '../abstract/schemas'
import {Token} from '../abstract/types'

export interface PersonDocument extends AuthenticatedDocument {
  firstName?: string
  lastName?: string
  email?: Array<IEmail>
  phone?: Array<IPhone>
  type: ['user' | 'contact' | 'person']
}

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

interface UserRole {
  account: mongoose.Types.ObjectId | string
  roles: Array<mongoose.Types.ObjectId | string>
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

export const PersonModel = mongoose.model<PersonDocument>('person', PersonSchema, 'people')
export const UserModel = mongoose.model<UserDocument>('user', UserSchema, 'people')
