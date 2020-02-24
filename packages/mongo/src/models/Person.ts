import mongoose from 'mongoose'
import extendSchema from '../extendSchema'
import bcrypt from 'bcrypt'
const saltRounds = 10
import {DocumentWithTimestamps, Token} from '@luminate/graphql-utils'
import {BaseAuthenticatedSchema, AuthenticatedEntity, WithAuthenticatedMethods} from '../baseSchemas'

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

class UserAuthenticatedEntity extends AuthenticatedEntity {
  static buildReadConditionsForUser(user: Token | null) {
    return {
      $or: [
        {permissionType: 'public'},
        {
          $or: [
            {
              accounts: {
                $elemMatch: {
                  $in: user && user.account ? [user.account.id] : [],
                },
              },
            },
            {
              readAccess: {
                $elemMatch: {
                  $in: user && user.account ? [user.account.id] : [],
                },
              },
            },
            {
              adminAccess: {
                $elemMatch: {
                  $in: user && user.account ? [user.account.id] : [],
                },
              },
            },
          ],
        },
      ],
    }
  }

  static buildWriteConditionsForUser(user: Token | null) {
    return {
      $or: [
        {
          accounts: {
            $elemMatch: {
              $in: user && user.account ? [user.account.id] : [],
            },
          },
        },
        {
          writeAccess: {
            $elemMatch: {
              $in: user && user.account ? [user.account.id] : [],
            },
          },
        },
        {
          adminAccess: {
            $elemMatch: {
              $in: user && user.account ? [user.account.id] : [],
            },
          },
        },
      ],
    }
  }

  static buildAdminConditionsForUser(user: Token | null) {
    return {
      $or: [
        {
          accounts: {
            $elemMatch: {
              $in: user && user.account ? [user.account.id] : [],
            },
          },
        },
        {
          adminAccess: {
            $elemMatch: {
              $in: user && user.account ? [user.account.id] : [],
            },
          },
        },
      ],
    }
  }
}

PersonSchema.loadClass(AuthenticatedEntity)
UserSchema.loadClass(UserAuthenticatedEntity)

export const Person = mongoose.model<PersonDocument, PersonModel>('person', PersonSchema, 'people')
export const User = mongoose.model<UserDocument, UserModel>('user', UserSchema, 'people')
