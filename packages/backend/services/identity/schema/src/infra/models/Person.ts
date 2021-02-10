import {model, Types} from 'mongoose'
import {extendSchema, AuthenticatedDocument, BaseAuthenticatedSchema} from '@luminate/mongo-utils'

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
  defaultAccount?: Types.ObjectId
  scopes: string[]
  lastLoggedIn?: Date
}

export interface UserDocument extends BaseUserDocument {
  accounts?: Array<Types.ObjectId>
  roles?: UserRole[]
}

interface UserRole {
  account: Types.ObjectId | string
  roles: Array<Types.ObjectId | string>
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

export const PersonSchema = extendSchema(
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

export const UserSchema = extendSchema(
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
        type: Types.ObjectId,
        ref: 'account',
      },
    ],
    defaultAccount: {
      type: Types.ObjectId,
      ref: 'account',
    },
    roles: [
      {
        account: {
          type: Types.ObjectId,
          ref: 'account',
        },
        roles: [
          {
            type: String,
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

export const PersonModel = model<PersonDocument>('person', PersonSchema, 'people')
export const UserModel = model<UserDocument>('user', UserSchema, 'people')
