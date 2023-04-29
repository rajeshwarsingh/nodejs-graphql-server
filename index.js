const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');

// Lets Define GraphQL schema using the buildSchema function. This defines the types, queries, and mutations 
// that GraphQL server will support.
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Define the resolver functions for schema. These functions define how to resolve queries and mutations 
// defined in your schema. For example, here's a resolver function for the hello query:
const rootValue = {
  hello: () => 'Hello, world!'
};

// Set up an Express server and add a GraphQL middleware using express-graphql.
const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootValue,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('GraphQL server running at http://localhost:4000/graphql');
});

// Test your GraphQL server by visiting http://localhost:4000/graphql in your browser and using the GraphiQL
// interface to send queries to your server.