FROM node:12-alpine3.11 AS install
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

FROM node:12-alipine3.11
WORKDIR /app

COPY --from=install . .
RUN yarn workspace @luminate/mongo run build