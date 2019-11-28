const { gql } = require('apollo-server-fastify');

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

module.exports = {
    typeDefs,
}