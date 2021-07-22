graphql-generate:
	yarn generate

graphql-generate-server:
	yarn generate:server

graphql-generate-client:
	yarn generate:client

build: build-utils

build-utils:
	yarn build:utils

dev-api:
	yarn workspace @luminate/api develop

dev-app:
	yarn workspace @luminate/app develop
