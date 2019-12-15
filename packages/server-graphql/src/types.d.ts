import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Coffee = {
   __typename?: 'Coffee',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  country?: Maybe<Country>,
  region?: Maybe<Region>,
  varieties?: Maybe<Array<Maybe<Variety>>>,
  elevation?: Maybe<Scalars['String']>,
};

export type Country = {
   __typename?: 'Country',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  regions?: Maybe<Array<Maybe<Region>>>,
};

export type CreateCoffeeCoffeeInput = {
  name?: Maybe<Scalars['String']>,
  region?: Maybe<Scalars['ID']>,
};

export type CreateCountryInput = {
  name?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createCoffee?: Maybe<Coffee>,
  createCountry?: Maybe<Country>,
  _mutation?: Maybe<Scalars['String']>,
};


export type MutationCreateCoffeeArgs = {
  input: CreateCoffeeCoffeeInput
};


export type MutationCreateCountryArgs = {
  input: CreateCountryInput
};

export type Query = {
   __typename?: 'Query',
  listCoffees?: Maybe<Array<Maybe<Coffee>>>,
  getCoffee?: Maybe<Coffee>,
  listCountries?: Maybe<Array<Maybe<Country>>>,
  getCountry?: Maybe<Country>,
  _query?: Maybe<Scalars['String']>,
};


export type QueryGetCoffeeArgs = {
  id: Scalars['ID']
};


export type QueryGetCountryArgs = {
  id: Scalars['ID']
};

export type Region = {
   __typename?: 'Region',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  country?: Maybe<Country>,
};

export type Subscription = {
   __typename?: 'Subscription',
  _subscription?: Maybe<Scalars['String']>,
};

export type User = {
   __typename?: 'User',
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
};

export type Variety = {
   __typename?: 'Variety',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  background?: Maybe<Scalars['String']>,
  countriesFoundIn?: Maybe<Array<Maybe<Country>>>,
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  Coffee: ResolverTypeWrapper<Coffee>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Country: ResolverTypeWrapper<Country>,
  Region: ResolverTypeWrapper<Region>,
  Variety: ResolverTypeWrapper<Variety>,
  Mutation: ResolverTypeWrapper<{}>,
  CreateCoffeeCoffeeInput: CreateCoffeeCoffeeInput,
  CreateCountryInput: CreateCountryInput,
  Subscription: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  User: ResolverTypeWrapper<User>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  Coffee: Coffee,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Country: Country,
  Region: Region,
  Variety: Variety,
  Mutation: {},
  CreateCoffeeCoffeeInput: CreateCoffeeCoffeeInput,
  CreateCountryInput: CreateCountryInput,
  Subscription: {},
  Boolean: Scalars['Boolean'],
  User: User,
}>;

export type CoffeeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Coffee'] = ResolversParentTypes['Coffee']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>,
  region?: Resolver<Maybe<ResolversTypes['Region']>, ParentType, ContextType>,
  varieties?: Resolver<Maybe<Array<Maybe<ResolversTypes['Variety']>>>, ParentType, ContextType>,
  elevation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type CountryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  regions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Region']>>>, ParentType, ContextType>,
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createCoffee?: Resolver<Maybe<ResolversTypes['Coffee']>, ParentType, ContextType, RequireFields<MutationCreateCoffeeArgs, 'input'>>,
  createCountry?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<MutationCreateCountryArgs, 'input'>>,
  _mutation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  listCoffees?: Resolver<Maybe<Array<Maybe<ResolversTypes['Coffee']>>>, ParentType, ContextType>,
  getCoffee?: Resolver<Maybe<ResolversTypes['Coffee']>, ParentType, ContextType, RequireFields<QueryGetCoffeeArgs, 'id'>>,
  listCountries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Country']>>>, ParentType, ContextType>,
  getCountry?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<QueryGetCountryArgs, 'id'>>,
  _query?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type RegionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Region'] = ResolversParentTypes['Region']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>,
}>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  _subscription?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "_subscription", ParentType, ContextType>,
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type VarietyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Variety'] = ResolversParentTypes['Variety']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  background?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  countriesFoundIn?: Resolver<Maybe<Array<Maybe<ResolversTypes['Country']>>>, ParentType, ContextType>,
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Coffee?: CoffeeResolvers<ContextType>,
  Country?: CountryResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Region?: RegionResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  Variety?: VarietyResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
