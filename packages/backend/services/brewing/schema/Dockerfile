FROM node:12-alpine3.11 AS pre-install
WORKDIR /app

# backend dependencies
COPY ./packages/backend/utils/graphql/package.json ./packages/backend/utils/graphql/package.json
COPY ./packages/backend/utils/mongo/package.json ./packages/backend/utils/mongo/package.json
COPY ./packages/backend/services/shared ./packages/backend/services/shared
COPY ./packages/backend/services/brewing/schema ./packages/backend/services/brewing/schema

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
RUN yarn workspace @luminate/brewing-schema run build

CMD 'node packages/backend/services/brewing/schema/dist/startServer.js'

EXPOSE 3000

