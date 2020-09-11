export enum EventType {
  ACCOUNT_CREATED_EVENT = 'ACCOUNT_CREATED_EVENT',
  ACCOUNT_CREATED_WITH_OWNER_EVENT = 'ACCOUNT_CREATED_WITH_OWNER_EVENT',
  ACCOUNT_UPDATED_EVENT = 'ACCOUNT_UPDATED_EVENT',
  ACCOUNT_DELETED_EVENT = 'ACCOUNT_DELETED_EVENT',
  ACCOUNT_SWITCHED_EVENT = 'ACCOUNT_SWITCHED_EVENT',
  ACCOUNT_SWITCH_FAILED_EVENT = 'ACCOUNT_SWITCHED_FAILED_EVENT',
  ROLE_CREATED_EVENT = 'ROLE_CREATED_EVENT',
  ROLE_UPDATED_EVENT = 'ROLE_UPDATED_EVENT',
  ROLE_DELETED_EVENT = 'ROLE_DELETED_EVENT',
  USER_CREATED_EVENT = 'USER_CREATED_EVENT',
  USER_UPDATED_EVENT = 'USER_UPDATED_EVENT',
  USER_ROLES_UPDATED_EVENT = 'USER_ROLES_UPDATED_EVENT',
  USER_DELETED_EVENT = 'USER_DELETED_EVENT',
  USER_LOGGED_IN_EVENT = 'USER_LOGGED_IN_EVENT',
  USER_LOGGED_OUT_EVENT = 'USER_LOGGED_OUT_EVENT',
  USER_PASSWORD_UPDATED_EVENT = 'USER_PASSWORD_UPDATED_EVENT',
  USER_ADDED_TO_ACCOUNT_EVENT = 'USER_ADDED_TO_ACCOUNT_EVENT',
}