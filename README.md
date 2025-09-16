# Linked Volunteering UI

[![Build Status](https://travis-ci.org/City-of-Helsinki/linked-volunteering-ui.svg?branch=develop)](https://travis-ci.org/City-of-Helsinki/linked-volunteering-ui)

## Prerequisites

- Yarn
- Strong recommendation for an IDE: VSCode

### Recommended VSCode plugins:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Setup

After cloning this repository, create a new `.env.local` file from the provided `.env.example` file and configure it as needed:

```
$ cp .env.example .env.development.local
```

## Development

To start development environment, run:

```
$ yarn start
```

This will start [the application](http://localhost:3000) to run in port `3000`

## Testing

End-to-end testing is created with Playwright. To run tests:

```
$ yarn test:e2e:install
$ yarn test:e2e:start
```

## Docker

Before building image docker image at the first time, create a new `.env.local` file from the provided `.env.example` file and configure it as needed:

```
$ cp .env.example .env.production.local
```

`docker-compose build` to build docker image
`docker-compose up` to start the dockerized dev-environment. Not for production!!!  
`docker-compose down` stops the container.

## Commit message format

New commit messages must adhere to the [Conventional Commits](https://www.conventionalcommits.org/)
specification, and line length is limited to 72 characters.

[`commitlint`](https://github.com/conventional-changelog/commitlint) checks new commit messages for the correct format.
