const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        address: String!
        email: String!
        phoneNumber: String!
        password: String!
    }

    input RegisterInput {
        firstName: String!
        lastName: String!
        address: String!
        email: String!
        phoneNumber: String!
        password: String!
        confirmPassword: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Mutation {
        register(input: RegisterInput): User!
        login(input: LoginInput): User!
    }
    
    type Query {
        users: [User!]!
        user(id: ID!): User!
    }
`;

module.exports = { typeDefs };