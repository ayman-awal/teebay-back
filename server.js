const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const { typeDefs } = require("./schema/typedefs");
const { resolvers } = require("./schema/resolvers");

const app = express();

const cors = require("cors");
app.use(cors());

const prisma = new PrismaClient();

const server = new ApolloServer({ typeDefs, resolvers, context: () => ({ prisma })});

const PORT = 5000

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();