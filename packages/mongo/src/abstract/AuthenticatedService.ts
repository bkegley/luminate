import {BaseService} from './BaseService'
import {Token} from '@luminate/graphql-utils'
import {BaseDocument} from './documents'
import {IListDocumentsArgs} from './types'

export class AuthenticatedService<T extends BaseDocument> extends BaseService<T> {
  protected static user: Token | null = null

  public static loadUser(user: Token | null) {
    AuthenticatedService.user = user
  }

  protected readConditionsForUser = {
    $or: [
      {permissionType: 'public'},
      {
        $or: [
          {
            readAccess: {
              $elemMatch: {
                $in: [AuthenticatedService.user?.account?.id].filter(Boolean),
              },
            },
          },
          {
            adminAccess: {
              $elemMatch: {
                $in: [AuthenticatedService.user?.account?.id].filter(Boolean),
              },
            },
          },
        ],
      },
    ],
  }

  protected writeConditionsForUser = {
    $or: [
      {
        writeAccess: {
          $elemMatch: {
            $in: [AuthenticatedService.user?.account?.id].filter(Boolean),
          },
        },
      },
      {
        adminAccess: {
          $elemMatch: {
            $in: [AuthenticatedService.user?.account?.id].filter(Boolean),
          },
        },
      },
    ],
  }

  protected getAdminConditionsForUser = {
    adminAccess: {
      $elemMatch: {
        $in: [AuthenticatedService.user?.account?.id].filter(Boolean),
      },
    },
  }

  protected buildConnectionConditions(args: IListDocumentsArgs) {
    return super.buildConnectionConditions({...args, ...this.readConditionsForUser})
  }
}
