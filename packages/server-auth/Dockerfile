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
COPY package.json .
COPY yarn.lock .
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/packages/graphql-utils ./node_modules/@luminate/grapqhl-utils
COPY --from=build /usr/src/app/packages/mongo ./node_modules/@luminate/mongo
COPY --from=build /usr/src/app/packages/server-auth ./packages/server-auth

# ENTRYPOINT [ "node", "dist/startServer.js" ]
EXPOSE 3001