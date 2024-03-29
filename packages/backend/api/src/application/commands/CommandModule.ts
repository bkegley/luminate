import {Module} from '@nestjs/common'
import {CqrsModule} from '@nestjs/cqrs'
import {InfraModule} from '../../infra/InfraModule'
import {
  AddUserToAccountCommandHandler,
  CreateAccountWithOwnerCommandHandler,
  CreateBrewGuideCommandHander,
  CreateBrewerCommandHandler,
  CreateBrewingSessionCommandHandler,
  CreateCoffeeCommandHandler,
  CreateCuppingSessionCommandHandler,
  CreateEvaluationCommandHandler,
  CreateFarmCommandHandler,
  CreateGrinderCommandHandler,
  CreateOwnerRoleCommandHandler,
  CreatePostCommandHandler,
  CreateRecipeCommandHandler,
  CreateRoleCommandHandler,
  CreateUserCommandHandler,
  CreateVarietyCommandHandler,
  CreateViewCommandHandler,
  DeleteAccountCommandHandler,
  DeleteBrewGuideCommandHandler,
  DeleteBrewerCommandHandler,
  DeleteBrewingSessionCommandHandler,
  DeleteCoffeeCommandHandler,
  DeleteCuppingSessionCommandHandler,
  DeleteEvaluationCommandHandler,
  DeleteFarmCommandHandler,
  DeleteGrinderCommandHandler,
  DeletePostCommandHandler,
  DeleteRoleCommandHandler,
  DeleteUserCommandHandler,
  DeleteVarietyCommandHandler,
  DeleteViewCommandHandler,
  LoginUserCommandHandler,
  LogoutUserCommandHandler,
  RefreshTokenCommandHandler,
  SwitchAccountCommandHandler,
  TogglePostPinCommandHandler,
  UpdateAccountCommandHandler,
  UpdateBrewGuideCommandHandler,
  UpdateBrewerCommandHandler,
  UpdateBrewingSessionCommandHandler,
  UpdateCoffeeCommandHandler,
  UpdateCuppingSessionCommandHandler,
  UpdateEvaluationCommandHandler,
  UpdateFarmCommandHandler,
  UpdateGrinderCommandHandler,
  UpdateMeComandHandler,
  UpdatePostCommandHandler,
  UpdateRoleCommandHandler,
  UpdateUserCommandHandler,
  UpdateUserPasswordCommandHandler,
  UpdateUserRolesCommandHandler,
  UpdateVarietyCommandHandler,
  UpdateViewCommandHandler,
} from '.'

const handlers = [
  AddUserToAccountCommandHandler,
  CreateAccountWithOwnerCommandHandler,
  CreateBrewGuideCommandHander,
  CreateBrewerCommandHandler,
  CreateBrewingSessionCommandHandler,
  CreateCoffeeCommandHandler,
  CreateCuppingSessionCommandHandler,
  CreateEvaluationCommandHandler,
  CreateFarmCommandHandler,
  CreateGrinderCommandHandler,
  CreateOwnerRoleCommandHandler,
  CreatePostCommandHandler,
  CreateRecipeCommandHandler,
  CreateRoleCommandHandler,
  CreateUserCommandHandler,
  CreateVarietyCommandHandler,
  CreateViewCommandHandler,
  DeleteAccountCommandHandler,
  DeleteBrewGuideCommandHandler,
  DeleteBrewerCommandHandler,
  DeleteBrewingSessionCommandHandler,
  DeleteCoffeeCommandHandler,
  DeleteCuppingSessionCommandHandler,
  DeleteEvaluationCommandHandler,
  DeleteFarmCommandHandler,
  DeleteGrinderCommandHandler,
  DeletePostCommandHandler,
  DeleteRoleCommandHandler,
  DeleteUserCommandHandler,
  DeleteVarietyCommandHandler,
  DeleteViewCommandHandler,
  LoginUserCommandHandler,
  LogoutUserCommandHandler,
  RefreshTokenCommandHandler,
  SwitchAccountCommandHandler,
  TogglePostPinCommandHandler,
  UpdateAccountCommandHandler,
  UpdateBrewGuideCommandHandler,
  UpdateBrewerCommandHandler,
  UpdateBrewingSessionCommandHandler,
  UpdateCoffeeCommandHandler,
  UpdateCuppingSessionCommandHandler,
  UpdateEvaluationCommandHandler,
  UpdateFarmCommandHandler,
  UpdateGrinderCommandHandler,
  UpdateMeComandHandler,
  UpdatePostCommandHandler,
  UpdateRoleCommandHandler,
  UpdateUserCommandHandler,
  UpdateUserPasswordCommandHandler,
  UpdateUserRolesCommandHandler,
  UpdateVarietyCommandHandler,
  UpdateViewCommandHandler,
]

@Module({
  imports: [CqrsModule, InfraModule],
  providers: handlers,
  exports: handlers,
})
export class CommandModule {}
