require('dotenv').config({ path: '.env' });
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const authors = require('./routes/authors');
const books = require('./routes/books');
const { typeDefs, resolvers } = require('./graphql/schema');

const port = process.env.PORT;
const mongo_uri = process.env.DATABASE_URL;

try {
  mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useFindAndModify: false
  });
  console.log(`Connected to Database: ${mongo_uri}`);
} catch (error) {
  console.log(`Database Connection Error: ${err}`);
  process.exit();
}

const startAppolloServer = async () => {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.use(express.json());
  app.use('/api/authors', authors);
  app.use('/api/books', books);

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });

  app.listen({ port }, () => {
    console.log(`REST API is Running on: http://localhost:${port}`);
    console.log(`GraphQL is Running on: http://localhost:${port}${server.graphqlPath}`);
  });
};

startAppolloServer();
