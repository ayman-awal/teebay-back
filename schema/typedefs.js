const { gql } = require("apollo-server-express");
const { GraphQLDateTime } = ("graphql-scalars");

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
        isAvailable: Boolean!
        categories: Categories!
        description: String!
        purchasePrice: String!
        rentPrice: String!
        rentFrequency: rentFrequency!
        datePosted: String!
        perDay: Boolean!
        user: User!
    }

    type Transaction {
        id: Int!
        transactionType: transactionType!
        rentFrom: DateTime!
        rentTo: DateTime!
        productId: Int!
        primaryUserId: User
        secondaryUserId: User
    }

    input createTransactionInput {
        transactionType: transactionType!
        productId: Int!
        primaryUserId: Int!
        secondaryUserId: Int!
    }

    input createProductInput {
        title: String!
        isAvailable: Boolean
        categories: Categories!
        description: String!
        purchasePrice: String!
        rentPrice: String!
        rentFrequency: String!
        datePosted: DateTime!
        userId: Int!
    }

    enum Categories {
        ELECTRONICS
        FURNITURE
        HOME APPLIANCES
        SPORTING GOODS
        OUTDOOR
    }

    enum transactionType {
        SALE
        RENTAL
    }

    enum rentFrequency {
        PER_DAY
        PER_HOUR
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

    type Mutation {
        register(input: RegisterInput): User!
        login(input: LoginInput): User!
        deleteProduct(input: deleteProductInput): Boolean!
        createProduct(input: createProductInput): Product!
        createTransaction(input: createTransactionInput): Product!
    }
    
    type Query {
        users: [User!]!
        userById(id: ID!): User!
        products: [Product!]!
        productById(id: ID!): Product!
        productByUserId(id: ID!): [Product!]!
        productsByTransaction(id: ID!, type: String!, action: String!): [Transaction!]!
    }
`;

module.exports = { typeDefs };