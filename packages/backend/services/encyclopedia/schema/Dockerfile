FROM node:12-alpine3.11 AS pre-install
WORKDIR /app

# build python for bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python

# backend dependencies
COPY ./packages/backend/utils/graphql/package.json ./packages/backend/utils/graphql/package.json
COPY ./packages/backend/utils/mongo/package.json ./packages/backend/utils/mongo/package.json
COPY ./packages/backend/services/identity/schema ./packages/backend/services/identity/schema
COPY ./packages/backend/services/encyclopedia/schema ./packages/backend/services/encyclopedia/schema
COPY ./packages/backend/gateways/luminate ./packages/backend/gateways/luminate
COPY ./packages/backend/services/brewing/schema ./packages/backend/services/brewing/schema

# frontend dependencies
COPY ./packages/frontend/admin/package.json ./packages/frontend/admin/package.json
COPY ./packages/frontend/app/package.json ./packages/frontend/app/package.json
COPY ./packages/frontend/gatsby-theme-luminate/package.json ./packages/frontend/gatsby-theme-luminate/package.json

COPY lerna.json .
COPY package.json .
COPY yarn.lock .
COPY tsconfig.base.json .

RUN yarn

FROM mongo-utils AS mongo-utils
WORKDIR /app
COPY ./packages/backend/utils/mongo ./packages/backend/utils/mongo

FROM graphql-utils AS graphql-utils
WORKDIR /app
COPY ./packages/backend/utils/graphql ./packages/backend/utils/graphql

FROM pre-install AS install
WORKDIR /app
COPY --from=mongo-utils ./app/packages/backend/utils/mongo ./packages/backend/utils/mongo
COPY --from=graphql-utils ./app/packages/backend/utils/graphql ./packages/backend/utils/graphql

FROM node:12-alpine3.11
WORKDIR /app

COPY --from=install /app .
RUN yarn workspace @luminate/encyclopedia-schema run build

CMD 'node packages/backend/services/encyclopedia/schema/dist/startServer.js'

EXPOSE 3000
