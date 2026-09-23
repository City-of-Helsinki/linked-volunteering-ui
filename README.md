# Linked Volunteering UI

[![Build Status](https://travis-ci.org/City-of-Helsinki/linked-volunteering-ui.svg?branch=develop)](https://travis-ci.org/City-of-Helsinki/linked-volunteering-ui)

## Prerequisites

- pnpm v10.28.2
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
$ pnpm start
```

This will start [the application](http://localhost:3000) to run in port `3000`

## Testing

End-to-end testing is created with Playwright. To run tests:

```
$ pnpm run test:e2e:install
$ pnpm run test:e2e:start
```

## Docker

Before building image docker image at the first time, create a new `.env.local` file from the provided `.env.example` file and configure it as needed:

```
$ cp .env.example .env.production.local
```

`docker-compose build` to build docker image
`docker-compose up` to start the dockerized dev-environment. Not for production!!!  
`docker-compose down` stops the container.

## Dev Containers

This repository can also be opened in a [Dev Container](https://containers.dev/), reusing the same
`development` Docker build target and `compose.yaml` used for the dockerized dev-environment above.

1. Install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) VS Code extension.
2. Open the repository in VS Code and run **Dev Containers: Reopen in Container**.
   - On first run, if `.env.local` doesn't exist yet, it's automatically created from `.env.local.example`.
     Review/update its values as needed.

3. Once attached, run `pnpm start` in the integrated terminal to start the dev server, reachable at
   [http://localhost:3000](http://localhost:3000) same as the local/dockerized workflows.

### Dev Containers CLI

The same configuration can be used without VS Code via the
[Dev Containers CLI](https://github.com/devcontainers/cli):

```
$ npm install -g @devcontainers/cli
$ pnpm container:up
$ pnpm container:exec -- start
```

The app is reachable at [http://localhost:3000](http://localhost:3000). To open a shell inside the
container, run `pnpm container:exec -- exec bash`.

To remove the Dev Container stack, including its container, network and volumes, run:

```
$ pnpm container:down
```

Notes:

- End-to-end (Playwright) tests are not supported inside the Dev Container yet and should still be run
  on the host as described in [Testing](#testing).

## Commit message format

New commit messages must adhere to the [Conventional Commits](https://www.conventionalcommits.org/)
specification, and line length is limited to 72 characters.

[`commitlint`](https://github.com/conventional-changelog/commitlint) checks new commit messages for the correct format.
