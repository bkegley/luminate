FROM mongo-utils AS mongo-utils
WORKDIR /usr/src/app
COPY ./packages/mongo ./packages/mongo

FROM graphql-utils AS graphql-utils
WORKDIR /usr/src/app
COPY ./packages/graphql-utils ./packages/graphql-utils

FROM node:12-alpine3.11 AS build-server
WORKDIR /usr/src/app

# build python for bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python

COPY ./packages/server-sensory-eval ./packages/server-sensory-eval
COPY --from=mongo-utils /usr/src/app/packages/mongo ./packages/mongo
COPY --from=graphql-utils /usr/src/app/packages/graphql-utils ./packages/graphql-utils
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
COPY --from=graphql-utils /usr/src/app/packages/graphql-utils/package.json ./packages/graphql-utils/package.json
COPY --from=graphql-utils /usr/src/app/packages/graphql-utils/dist ./packages/graphql-utils/dist
COPY --from=mongo-utils /usr/src/app/packages/mongo/package.json ./packages/mongo/package.json
COPY --from=mongo-utils /usr/src/app/packages/mongo/dist ./packages/mongo/dist
COPY --from=build-server /usr/src/app/packages/server-sensory-eval/package.json ./packages/server-sensory-eval/package.json
COPY --from=build-server /usr/src/app/packages/server-sensory-eval/dist ./packages/server-sensory-eval/dist

RUN yarn

ENTRYPOINT [ "node", "packages/server-sensory-eval/dist/startServer.js" ]
EXPOSE 3001