FROM node:12-alpine3.11 AS pre-install
WORKDIR /app

# build python for bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python

# backend dependencies
COPY ./packages/backend/utils/graphql/package.json ./packages/backend/utils/graphql/package.json
COPY ./packages/backend/utils/mongo/package.json ./packages/backend/utils/mongo/package.json
COPY ./packages/backend/services/identity/schema ./packages/backend/services/identity/schema
COPY ./packages/backend/services/encyclopedia/schema ./packages/backend/services/encyclopedia/schema
COPY ./packages/backend/gateways/luminate ./packages/backend/gateways/luminate
COPY ./packages/backend/services/brewing/schema ./packages/backend/services/brewing/schema
COPY ./packages/backend/services/shared ./packages/backend/services/shared

# frontend dependencies
COPY ./packages/frontend/admin/package.json ./packages/frontend/admin/package.json
COPY ./packages/frontend/app/package.json ./packages/frontend/app/package.json
COPY ./packages/frontend/gatsby-theme-luminate/package.json ./packages/frontend/gatsby-theme-luminate/package.json

COPY lerna.json .
COPY package.json .
COPY yarn.lock .
COPY tsconfig.base.json .

RUN yarn

FROM node:12-alpine3.11 as install
WORKDIR /app
COPY --from=pre-install /app .
COPY ./packages/frontend/gatsby-theme-luminate ./packages/frontend/gatsby-theme-luminate


FROM node:12-alpine3.11 as build
WORKDIR /app

COPY --from=install /app .
RUN yarn workspace @luminate/app run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

EXPOSE 80

COPY --from=build /app/packages/frontend/app/public /usr/share/nginx/html
