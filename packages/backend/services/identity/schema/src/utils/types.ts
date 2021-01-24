export const TYPES = {
  // Infra
  KafkaClient: Symbol('KafkaClient'),
  KafkaProducer: Symbol('KafkaProducer'),
  CommandRegistry: Symbol('CommandRegistry'),
  User: Symbol('User'),

  // Projections
  AccountsProjection: Symbol('AccountsProjection'),
  RolesProjection: Symbol('RolesProjection'),
  UsersProjection: Symbol('UsersProjection'),

  // Repos
  AccountsRepo: Symbol('AccountsRepo'),
  RolesRepo: Symbol('RolesRepo'),
  UsersRepo: Symbol('UsersRepo'),
}
