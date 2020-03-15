FROM node:12-alpine3.11 AS build
WORKDIR /usr/src/app

# build python for bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python

COPY ./packages/graphql-utils ./packages/graphql-utils
COPY ./packages/mongo ./packages/mongo
COPY ./packages/server-auth ./packages/server-auth
COPY lerna.json .
COPY package.json .
COPY yarn.lock .
COPY tsconfig.base.json .

RUN yarn

RUN yarn build:utils
RUN yarn workspace @luminate/server-auth run build

FROM node:12-alpine3.11 AS run
WORKDIR /usr/src/app

RUN apk --no-cache add --virtual builds-deps build-base python

COPY package.json .
COPY yarn.lock .
COPY --from=build /usr/src/app/packages/graphql-utils/package.json ./packages/graphql-utils/package.json
COPY --from=build /usr/src/app/packages/graphql-utils/dist ./packages/graphql-utils/dist
COPY --from=build /usr/src/app/packages/mongo/package.json ./packages/mongo/package.json
COPY --from=build /usr/src/app/packages/mongo/dist ./packages/mongo/dist
COPY --from=build /usr/src/app/packages/server-auth/package.json ./packages/server-auth/package.json
COPY --from=build /usr/src/app/packages/server-auth/dist ./packages/server-auth/dist

RUN yarn

ENTRYPOINT [ "node", "packages/server-auth/dist/startServer.js" ]
EXPOSE 3001