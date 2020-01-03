import { GraphQLResolveInfo } from 'graphql';
import { CuppingDocument, CoffeeCuppingDocument } from '@luminate/mongo';
import { Context } from './startServer';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  _FieldSet: any,
};






export type Coffee = {
   __typename?: 'Coffee',
  id: Scalars['ID'],
};

export type CreateCuppingInput = {
  description?: Maybe<Scalars['String']>,
};

export type Cupping = {
   __typename?: 'Cupping',
  id: Scalars['ID'],
  description?: Maybe<Scalars['String']>,
  coffees?: Maybe<Array<Maybe<CuppingCoffee>>>,
  createdAt?: Maybe<Scalars['String']>,
  updatedAt?: Maybe<Scalars['String']>,
};

export type CuppingCoffee = {
   __typename?: 'CuppingCoffee',
  sessionCoffeeId: Scalars['ID'],
  coffee: Coffee,
};

export type CuppingCoffeeInput = {
  sessionCoffeeId: Scalars['ID'],
  coffee?: Maybe<Scalars['ID']>,
};

export type CuppingConnection = {
   __typename?: 'CuppingConnection',
  pageInfo: PageInfo,
  edges: Array<CuppingEdge>,
};

export type CuppingEdge = {
   __typename?: 'CuppingEdge',
  cursor?: Maybe<Scalars['String']>,
  node?: Maybe<Cupping>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createCupping?: Maybe<Cupping>,
  updateCupping?: Maybe<Cupping>,
  deleteCupping?: Maybe<Cupping>,
};


export type MutationCreateCuppingArgs = {
  input: CreateCuppingInput
};


export type MutationUpdateCuppingArgs = {
  id: Scalars['ID'],
  input: UpdateCuppingInput
};


export type MutationDeleteCuppingArgs = {
  id: Scalars['ID']
};

export enum OperatorEnum {
  Eq = 'eq',
  Ne = 'ne',
  Gt = 'gt',
  Gte = 'gte',
  Lt = 'lt',
  Lte = 'lte',
  Contains = 'contains',
  ContainsSensitive = 'containsSensitive'
}

export type PageInfo = {
   __typename?: 'PageInfo',
  hasNextPage?: Maybe<Scalars['Boolean']>,
  prevCursor?: Maybe<Scalars['String']>,
  nextCursor?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  listCuppings: CuppingConnection,
  getCupping?: Maybe<Cupping>,
};


export type QueryListCuppingsArgs = {
  cursor?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  query?: Maybe<Array<Maybe<QueryInput>>>
};


export type QueryGetCuppingArgs = {
  id: Scalars['ID']
};

export type QueryInput = {
  field: Scalars['String'],
  value?: Maybe<Scalars['String']>,
  operator?: Maybe<OperatorEnum>,
};

export type UpdateCuppingInput = {
  description?: Maybe<Scalars['String']>,
  coffees?: Maybe<Array<Maybe<CuppingCoffeeInput>>>,
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

export type ReferenceResolver<TResult, TReference, TContext> = (
      reference: TReference,
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
  String: ResolverTypeWrapper<Scalars['String']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  QueryInput: QueryInput,
  OperatorEnum: OperatorEnum,
  CuppingConnection: ResolverTypeWrapper<Omit<CuppingConnection, 'edges'> & { edges: Array<ResolversTypes['CuppingEdge']> }>,
  PageInfo: ResolverTypeWrapper<PageInfo>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  CuppingEdge: ResolverTypeWrapper<Omit<CuppingEdge, 'node'> & { node?: Maybe<ResolversTypes['Cupping']> }>,
  Cupping: ResolverTypeWrapper<CuppingDocument>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  CuppingCoffee: ResolverTypeWrapper<CoffeeCuppingDocument>,
  Coffee: ResolverTypeWrapper<Coffee>,
  Mutation: ResolverTypeWrapper<{}>,
  CreateCuppingInput: CreateCuppingInput,
  UpdateCuppingInput: UpdateCuppingInput,
  CuppingCoffeeInput: CuppingCoffeeInput,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  String: Scalars['String'],
  Int: Scalars['Int'],
  QueryInput: QueryInput,
  OperatorEnum: OperatorEnum,
  CuppingConnection: Omit<CuppingConnection, 'edges'> & { edges: Array<ResolversParentTypes['CuppingEdge']> },
  PageInfo: PageInfo,
  Boolean: Scalars['Boolean'],
  CuppingEdge: Omit<CuppingEdge, 'node'> & { node?: Maybe<ResolversParentTypes['Cupping']> },
  Cupping: CuppingDocument,
  ID: Scalars['ID'],
  CuppingCoffee: CoffeeCuppingDocument,
  Coffee: Coffee,
  Mutation: {},
  CreateCuppingInput: CreateCuppingInput,
  UpdateCuppingInput: UpdateCuppingInput,
  CuppingCoffeeInput: CuppingCoffeeInput,
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  listCuppings?: Resolver<ResolversTypes['CuppingConnection'], ParentType, ContextType, QueryListCuppingsArgs>,
  getCupping?: Resolver<Maybe<ResolversTypes['Cupping']>, ParentType, ContextType, RequireFields<QueryGetCuppingArgs, 'id'>>,
}>;

export type CuppingConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CuppingConnection'] = ResolversParentTypes['CuppingConnection']> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
  edges?: Resolver<Array<ResolversTypes['CuppingEdge']>, ParentType, ContextType>,
}>;

export type PageInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  prevCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  nextCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type CuppingEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CuppingEdge'] = ResolversParentTypes['CuppingEdge']> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  node?: Resolver<Maybe<ResolversTypes['Cupping']>, ParentType, ContextType>,
}>;

export type CuppingResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Cupping'] = ResolversParentTypes['Cupping']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Cupping']>, { __typename: 'Cupping' } & Pick<ParentType, 'id'>, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  coffees?: Resolver<Maybe<Array<Maybe<ResolversTypes['CuppingCoffee']>>>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type CuppingCoffeeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CuppingCoffee'] = ResolversParentTypes['CuppingCoffee']> = ResolversObject<{
  sessionCoffeeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  coffee?: Resolver<ResolversTypes['Coffee'], ParentType, ContextType>,
}>;

export type CoffeeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Coffee'] = ResolversParentTypes['Coffee']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Coffee']>, { __typename: 'Coffee' } & Pick<ParentType, 'id'>, ContextType>,

}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createCupping?: Resolver<Maybe<ResolversTypes['Cupping']>, ParentType, ContextType, RequireFields<MutationCreateCuppingArgs, 'input'>>,
  updateCupping?: Resolver<Maybe<ResolversTypes['Cupping']>, ParentType, ContextType, RequireFields<MutationUpdateCuppingArgs, 'id' | 'input'>>,
  deleteCupping?: Resolver<Maybe<ResolversTypes['Cupping']>, ParentType, ContextType, RequireFields<MutationDeleteCuppingArgs, 'id'>>,
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Query?: QueryResolvers<ContextType>,
  CuppingConnection?: CuppingConnectionResolvers<ContextType>,
  PageInfo?: PageInfoResolvers<ContextType>,
  CuppingEdge?: CuppingEdgeResolvers<ContextType>,
  Cupping?: CuppingResolvers<ContextType>,
  CuppingCoffee?: CuppingCoffeeResolvers<ContextType>,
  Coffee?: CoffeeResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
