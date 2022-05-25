# Pipeline Integrity

Intuitive web app for tracking pipeline integrity and visualizing risk assessment. Fully featured with secure cookie authentication, levels of user authorization, rules enforcement, and modification tracking.

## Technology

### Client
- [Next.js](https://nextjs.org/) React framework with TypeScript
- [Apollo Client](https://www.apollographql.com/docs/react) to fetch, cache, and modify application data

### Server
- [Node.js](https://nodejs.dev/learn/nodejs-with-typescript) with TypeScript
- [Apollo](https://www.apollographql.com/docs/apollo-server/) GraphQL server
- [Prisma](https://www.prisma.io/docs/getting-started) TypeScript ORM
- [Nexus](https://nexusjs.org/) declarative, code-first and strongly typed GraphQL schema construction for TypeScript

### Database
- [PostgreSQL](https://www.postgresql.org/) object-relational database

## Setup

### Installing dependencies
Install dependencies by running `npm i` in root directory.

### PostgreSQL
Before running following commands make sure you have PostgreSQL installed on your machine.

Rename `.env.example` file to `.env`. Inside, replace the word 'password' of DATABASE_URL with your 'postgres' superuser password.

Migrate Prisma schema defined in `prisma/schema.prisma` file to Postgres database schema by running `prisma migrate dev --name init`.

Populate your database by running `prisma db seed`.

Pipeline daily flow volume is the total of all upstream chained pipelines. Because the number of upstream pipelines is arbitrary, we are not able to write this query using Prisma Client. We must create user-defined database function that loops through left joins until it reaches null. Run `psql -h localhost -U postgres -d integrity_pro -a -f prisma/pipeline_flow_dynamic.sql` to do that. You will be prompted to enter superuser password.

Prisma Client configures database to restrict deletion of record that are referenced by records in foreign tables. We want to alter this constraint for all the records referencing pipeline table to be automatically deleted when a pipeline is deleted. Run `psql -h localhost -U postgres -d integrity_pro -a -f prisma/alter_on_delete_cascade.sql`.

### Run the development server:

`npm run dev`

Open [http://localhost:3000](http://localhost:3000) to view the app.

App will automatically make the first ever registered user an ADMIN. Only users with role of ADMIN can add new users.