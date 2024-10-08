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

    type Product {
        id: ID!
        title: String!
        categories: Categories!
        description: String!
        purchasePrice: String!
        rentPrice: String!
        datePosted: String!
        perDay: Boolean!
        user: User!
    }

    input createProductInput {
        title: String!
        categories: Categories!
        description: String!
        purchasePrice: String!
        rentPrice: String!
        datePosted: String!
        perDay: Boolean!
        userId: Int!
    }

    enum Categories {
        ELECTRONICS
        FURNITURE
        HOME APPLIANCES
        SPORTING GOODS
        OUTDOOR
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
        createProduct(input: createProductInput): Product!
    }
    
    type Query {
        users: [User!]!
        userById(id: ID!): User!
        products: [Product!]!
        productById(id: ID!): Product!
        productByUserId(id: ID!): [Product!]!
    }
`;

module.exports = { typeDefs };