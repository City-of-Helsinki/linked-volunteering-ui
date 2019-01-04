# Linked Volunteering UI

[![Build Status](https://travis-ci.org/City-of-Helsinki/linked-volunteering-ui.svg?branch=master)](https://travis-ci.org/City-of-Helsinki/linked-volunteering-ui)

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

End-to-end testing is created with Cypress.io framework. To run tests:

```
$ yarn cypress
```
