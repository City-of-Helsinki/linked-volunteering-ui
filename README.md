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

## License

The source code in this repository is licensed under the MIT License; see
[LICENSE](./LICENSE). The licenses of the third-party code included in the
production build are listed in `third-party-licenses.txt`, which is generated
during the build and served from the root of the deployed application. The
same information is emitted alongside it as `oss-licenses.json`, for license
audit tooling.

The MIT License covers source code only. The following files are **not**
covered by it and remain with their respective rights holders:

| Files                  | Rights holder and terms                                                                                                                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/h-favicon.ico` | City of Helsinki. The City of Helsinki logo is a registered trademark.                                                                                                                                         |
| `src/assets/images/`   | Photographs used by the service, added between 2018 and 2020 without a recorded source; `_MG_2851_c_Jussi_Hellsten.jpg` names Jussi Hellsten as its photographer. Not offered for reuse under the MIT License. |

The following third-party resources are loaded at runtime from external
services instead of being bundled, so they do not appear in either generated
file and are not redistributed by this repository or by its build output:

- [oidc-client-ts](https://github.com/authts/oidc-client-ts) (Apache-2.0),
  loaded by [silent_renew.html](./public/silent_renew.html) from cdnjs with a
  subresource integrity hash.
- The Helsinki Grotesk typeface, which is proprietary and licensed by Camelot
  Typefaces, loaded from a City of Helsinki service by the styles of
  [open-city-design](https://github.com/City-of-Helsinki/open-city-design).
- The Noto Serif typeface (SIL Open Font License 1.1), loaded from Google Fonts
  by the same styles.
- The map tiles, loaded from the City of Helsinki map tile service. They are
  rendered from OpenStreetMap data, © OpenStreetMap contributors, available
  under the Open Database License.
