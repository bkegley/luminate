FROM node:12-alpine3.11 AS pre-install
WORKDIR /app

# build python for bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python

# backend dependencies
COPY ./packages/backend/graphql-utils/package.json ./packages/backend/graphql-utils/package.json
COPY ./packages/backend/mongo/package.json ./packages/backend/mongo/package.json
COPY ./packages/backend/services/identity/schema ./packages/backend/services/identity/schema
COPY ./packages/backend/services/encyclopedia/schema ./packages/backend/services/encyclopedia/schema
COPY ./packages/backend/gateways/luminate ./packages/backend/gateways/luminate
COPY ./packages/backend/services/sensory-eval/schema ./packages/backend/services/sensory-eval/schema

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
COPY ./packages/backend/mongo ./packages/backend/mongo

FROM graphql-utils AS graphql-utils
WORKDIR /app
COPY ./packages/backend/graphql-utils ./packages/backend/graphql-utils

FROM pre-install AS install
WORKDIR /app
COPY --from=mongo-utils ./app/packages/backend/mongo ./packages/backend/mongo
COPY --from=graphql-utils ./app/packages/backend/graphql-utils ./packages/backend/graphql-utils

FROM node:12-alpine3.11
WORKDIR /app

COPY --from=install /app .
RUN yarn workspace @luminate/gateway-luminate run build

CMD 'node packages/backend/gateways/luminate/dist/startServer.js'

EXPOSE 3000