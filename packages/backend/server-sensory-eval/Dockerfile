FROM mongo-utils AS mongo-utils
WORKDIR /usr/src/app
COPY ./packages/backend/mongo ./packages/backend/mongo

FROM graphql-utils AS graphql-utils
WORKDIR /usr/src/app
COPY ./packages/backend/graphql-utils ./packages/backend/graphql-utils

FROM node:12-alpine3.11 AS build-server
WORKDIR /usr/src/app

# build python for bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python

COPY ./packages/backend/server-sensory-eval ./packages/backend/server-sensory-eval
COPY --from=mongo-utils /usr/src/app/packages/backend/mongo ./packages/backend/mongo
COPY --from=graphql-utils /usr/src/app/packages/backend/graphql-utils ./packages/backend/graphql-utils
COPY lerna.json .
COPY package.json .
COPY yarn.lock .
COPY tsconfig.base.json .

RUN yarn

RUN yarn workspace @luminate/server-sensory-eval run build

FROM node:12-alpine3.11 AS run
WORKDIR /usr/src/app

RUN apk --no-cache add --virtual builds-deps build-base python

COPY package.json .
COPY yarn.lock .
COPY --from=graphql-utils /usr/src/app/packages/backend/graphql-utils/package.json ./packages/backend/graphql-utils/package.json
COPY --from=graphql-utils /usr/src/app/packages/backend/graphql-utils/dist ./packages/backend/graphql-utils/dist
COPY --from=mongo-utils /usr/src/app/packages/backend/mongo/package.json ./packages/backend/mongo/package.json
COPY --from=mongo-utils /usr/src/app/packages/backend/mongo/dist ./packages/backend/mongo/dist
COPY --from=build-server /usr/src/app/packages/backend/server-sensory-eval/package.json ./packages/backend/server-sensory-eval/package.json
COPY --from=build-server /usr/src/app/packages/backend/server-sensory-eval/dist ./packages/backend/server-sensory-eval/dist

RUN yarn

ENTRYPOINT [ "node", "packages/backend/server-sensory-eval/dist/startServer.js" ]
EXPOSE 3001