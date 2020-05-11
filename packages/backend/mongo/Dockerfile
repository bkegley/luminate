FROM node:12-alpine3.11 AS install
WORKDIR /app

# build python for bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python

# backend dependencies
COPY ./packages/backend/graphql-utils/package.json ./packages/backend/graphql-utils/package.json
COPY ./packages/backend/mongo/package.json ./packages/backend/mongo/package.json
COPY ./packages/backend/server-auth ./packages/backend/server-auth
COPY ./packages/backend/server-encyclopedia ./packages/backend/server-encyclopedia
COPY ./packages/backend/server-gateway ./packages/backend/server-gateway
COPY ./packages/backend/server-sensory-eval ./packages/backend/server-sensory-eval

# frontend dependencies
COPY ./packages/frontend/admin/package.json ./packages/backend/admin/package.json
COPY ./packages/frontend/app/package.json ./packages/backend/app/package.json
COPY ./packages/frontend/gatsby-theme-luminate/package.json ./packages/backend/gatsby-theme-luminate/package.json

COPY lerna.json .
COPY package.json .
COPY yarn.lock .
COPY tsconfig.base.json .

RUN yarn

FROM node:12-alipine3.11
WORKDIR /app

COPY --from=install . .
RUN yarn workspace @luminate/mongo run build