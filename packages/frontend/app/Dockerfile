FROM node:12-alpine3.11 AS pre-install
WORKDIR /app

# frontend dependencies
COPY ./packages/frontend/app/package.json ./packages/frontend/app/package.json
COPY ./packages/frontend/components/package.json ./packages/frontend/components/package.json
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
