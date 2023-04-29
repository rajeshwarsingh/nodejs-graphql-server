// const bodyParser = require('body-parser');
// const express = require('express');
// const cors = require('cors')

// const db = require('./db');
// const port = process.env.PORT || 9000;

// const app = express();

// const fs = require('fs');
import fs from 'fs';
const typeDefs = fs.readFileSync('./schema.graphql', { encoding: 'utf-8' });
// const resolvers = require('./resolvers');

// const { makeExecutableSchema } = require('graphql-tools');
// const schema = makeExecutableSchema({ typeDefs, resolvers });

// app.use(cors(), bodyParser.json());

// const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
// app.use('/graphql', graphqlExpress({ schema }));
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// app.listen(
//   port, () => console.info(
//     `Server started on port ${port}`
//   )
// );
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import resolvers from './resolvers.js';
// const resolvers = require('./resolvers');

// The GraphQL schema
// const typeDefs = `#graphql
//   type Query {
//     hello: String
//   }
// `;

// A map of functions which return data for the schema.
// const resolvers = {
//   Query: {
//     hello: () => 'world',
//   },
// };

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);