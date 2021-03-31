FROM node:12-alpine3.11 AS install
WORKDIR /app

# backend dependencies
COPY ./packages/backend/utils/mongo/package.json ./packages/backend/utils/mongo/package.json

COPY lerna.json .
COPY package.json .
COPY yarn.lock .
COPY tsconfig.base.json .

RUN yarn

FROM node:12-alipine3.11
WORKDIR /app

COPY --from=install . .
RUN yarn workspace @luminate/mongo-utils run build
