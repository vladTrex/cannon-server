import {gql} from "apollo-server-express";

export const typeDefs = gql`
    input ProductInput {
        title: String!
        category: String!
    }
    
    type Product {
        _id: ID
        title: String
        category: String
    }

    type Query {
        products: [Product]
        product(id: ID!): Product
    }

    type Response {
        success: Boolean
    }

    type Mutation {
        addProduct(title: String!, category: String!) : Product
        updateProduct(productId: ID!, input: ProductInput) : Product
        removeProduct(productId: String!) : Response
    }
`;