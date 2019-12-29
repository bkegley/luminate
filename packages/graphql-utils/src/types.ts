export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Mutation = {
   __typename?: 'Mutation',
  _mutation?: Maybe<Scalars['String']>,
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
  _query?: Maybe<Scalars['String']>,
};

export type QueryInput = {
  field: Scalars['String'],
  value?: Maybe<Scalars['String']>,
  operator?: Maybe<OperatorEnum>,
};

export type Subscription = {
   __typename?: 'Subscription',
  _subscription?: Maybe<Scalars['String']>,
};
