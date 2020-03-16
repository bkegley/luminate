FROM node:12-alpine3.11 AS build
WORKDIR /usr/src/app

# build python for bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python

COPY ./packages/mongo ./packages/mongo
COPY ./packages/graphql-utils ./packages/graphql-utils
COPY lerna.json .
COPY package.json .
COPY yarn.lock .
COPY tsconfig.base.json .

RUN yarn
RUN yarn workspace @luminate/mongo run build