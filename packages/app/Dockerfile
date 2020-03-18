FROM node:12-alpine3.11 AS build
WORKDIR /usr/src/app

# build python for bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python

COPY ./packages/app ./packages/app
COPY ./packages/gatsby-theme-luminate ./packages/gatsby-theme-luminate
COPY lerna.json .
COPY package.json .
COPY yarn.lock .
COPY tsconfig.base.json .

RUN yarn

RUN yarn workspace @luminate/app run build

FROM node:12-alpine3.11 AS run
WORKDIR /usr/src/app

# build python for bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python

COPY package.json .
COPY --from=build /usr/src/app/packages/app ./packages/app
COPY --from=build /usr/src/app/packages/gatsby-theme-luminate ./packages/gatsby-theme-luminate

RUN yarn

CMD [ "yarn", "workspace", "@luminate/app", "run", "serve", "--host", "0.0.0.0", "-p", "8000" ]
EXPOSE 8000