# Zuj Backend Test

## Database Schema Design & API Docs

- [DB Diagram](https://dbdocs.io/sanglx/zuj-backend-test).
- [API Docs](https://zuj.springlee.dev/v1/docs).
- [API Links](https://zuj.springlee.dev).

## Development

### Prequisites

- [NodeJS](https://nodejs.org/en).
- [TypeScript](https://www.typescriptlang.org/).
- [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com/).
- [NestJS](https://nestjs.com/).
- [MySQL](https://www.mysql.com/).
- [TypeORM](https://typeorm.io/).

### Setup

- Install dependencies by run the following command:

```bash
$ yarn
```

- Configure your env file

```bash
$ cp .env.example .env
```

and then edit your `.env` enviroment variables file.

- Run database migration by run the following command:

```bash
$ yarn run migration:run
```

- To generate migration file, use the following command:

```bash
$ yarn run migration:generate src/migrations/<migration-name>
```

- To create migration file, run command:

```bash
$ yarn run migration:create src/migrations<migration-name>
```

- To revert migration verion

```bash
$ yarn run migration:revert
```

### Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
