## Getting started: Docker

**Disclaimer: Not currently working**
Having issues getting this up and running with multiple environments. Currently to get a local dev frontend environment with hot reloading run the following:

```sh
docker-compose \
-f docker-compose.yml \
-f docker-compose.prod.yml up -d && \
docker-compose stop app && \
yarn workspace @luminate/app run develop -p 8001
```

Create a volume for persistent data:
`docker volume create --name=mongo`

Build images:
`docker-compose build`

Run application:
`docker-compose up -d`

## Getting started: Local

Run the following commands in this order.

- `yarn`
- `yarn build:utils`

  ### In 1 terminal

- `yarn develop:services`

  ### In another terminal

- `yarn develop:gateway`
- Run an instance of a mongo server

## Contributing

- Fork
- Clone your fork `git@github.com:<yourusername>/luminate.git`
- CD to your project `cd luminate`
- Set your upstream `git remote add upstream git@github.com:bkegley/luminate.git`
- Create a new branch `git checkout -b awesomeBranch`
- Push to your local branch `git push -u origin awesomeBranch`
