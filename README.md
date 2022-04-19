# NC News Project API

Environment Variables:
You will need to create two .env files for your project: .env.test and .env.development to connect to the correct developer and test database respectively.

# Link to the hosted site

# Descrption

A Basic server that provides articles on various topics , with a fetcher that lets visitors to post comments and vote on articles .

# Setup Instrucions

1. Clone the remote git repository to a local machine.

```bash
git clone
```

2. Install the dependencies using the command

```bash
npm install
```

3.setup and seed the database by running the commands in the order shown below

```bash
 npm setup-dbs
npm seed
```

4. Test can be run using jest with the command.

```bash
- npm test
```

NOTE:
The test scripts will connect to the test database automatically so there is no need to provide .env files to run the tests.
However if you wish to connect tot the development or test databases you will need to provide .env files in the form .

```PGDATABASE=**your--database-name-goes-here**

```

## Minimum supported versions

node.js v17.4.0
Postgres 8.7.3

## Other dependencies

dotenv

express

pg-format
