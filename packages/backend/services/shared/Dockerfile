FROM node:12-alpine3.11 AS install
WORKDIR /app

COPY lerna.json .
COPY package.json .
COPY yarn.lock .
COPY tsconfig.base.json .
COPY ./packages/backend/services/shared ./packages/backend/shared

RUN yarn

FROM node:12-alpine3.11
WORKDIR /app

COPY --from=install /app .
RUN yarn workspace @luminate/services-shared run build
