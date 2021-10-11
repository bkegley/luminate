FROM node:14-alpine AS pre-install
WORKDIR /app

# backend dependencies
COPY ./packages/backend/utils/graphql/package.json ./packages/backend/utils/graphql/package.json
COPY ./packages/backend/utils/mongo/package.json ./packages/backend/utils/mongo/package.json
COPY ./packages/backend/utils/ddd/package.json ./packages/backend/utils/ddd/package.json

COPY lerna.json .
COPY package.json .
COPY yarn.lock .
COPY tsconfig.base.json .

RUN yarn

FROM pre-install AS install
# TODO: build dependent packages

FROM node:14-alpine
WORKDIR /app

COPY --from=install /app .
RUN yarn workspace @luminate/api run build

CMD 'node packages/backend/api/dist/startServer.js'

EXPOSE 3000
