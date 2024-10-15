const { gql } = require("apollo-server-express");

const typeDefs = gql`
    scalar DateTime
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
        userId: String!
        isAvailable: Boolean!
        categories: String!
        description: String!
        purchasePrice: String!
        rentPrice: String!
        rentFrequency: String!
        datePosted: String!
        user: User!
    }

    type Transaction {
        id: Int!
        transactionType: String!
        rentFrom: DateTime!
        rentTo: DateTime!
        productId: Int!
        primaryUserId: User
        secondaryUserId: User
    }

    input createTransactionInput {
        transactionType: String!
        productId: Int!
        primaryUserId: Int!
        secondaryUserId: Int!
        rentFrom: DateTime
        rentTo: DateTime
    }

    input createProductInput {
        title: String!
        isAvailable: Boolean
        categories: String!
        description: String!
        purchasePrice: String!
        rentPrice: String!
        rentFrequency: String!
        datePosted: DateTime!
        userId: Int!
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

    input deleteProductInput{
        userId: Int!
        productId: Int!
    }

    input editProductInput{
        productId: Int!
        title: String!
        rentPrice: String!
        purchasePrice: String!
        description: String!
        rentFrequency: String!
        categories: String!
    }

    type Mutation {
        register(input: RegisterInput): User!
        login(input: LoginInput): User!
        deleteProduct(input: deleteProductInput): Boolean!
        createProduct(input: createProductInput): Product!
        editProduct(input: editProductInput): Product!
        createTransaction(input: createTransactionInput): Transaction!
    }
    
    type Query {
        users: [User!]!
        userById(id: ID!): User!
        products: [Product!]!
        productById(id: ID!): Product!
        productByUserId(id: ID!): [Product!]!
        productsByTransaction(id: ID!, type: String!, action: String!): [Product]!
    }
`;

module.exports = { typeDefs };