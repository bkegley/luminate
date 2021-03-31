FROM node:12-alpine3.11 AS pre-install
WORKDIR /app

COPY ./packages/backend/utils/graphql/package.json ./packages/backend/utils/graphql/package.json
COPY ./packages/backend/utils/mongo/package.json ./packages/backend/utils/mongo/package.json

COPY lerna.json .
COPY package.json .
COPY yarn.lock .
COPY tsconfig.base.json .

RUN yarn

FROM mongo-utils AS mongo-utils
WORKDIR /app
COPY ./packages/backend/utils/mongo ./packages/backend/utils/mongo

FROM pre-install AS install
WORKDIR /app
COPY --from=mongo-utils ./app/packages/backend/utils/mongo ./packages/backend/utils/mongo

FROM node:12-alipine3.11
WORKDIR /app

COPY --from=mongo-utils ./app/packages/backend/utils/mongo ./packages/backend/utils/mongo
COPY --from=install . .
RUN yarn workspace @luminate/graphql-utils run build
