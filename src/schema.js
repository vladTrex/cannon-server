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

    type Me {
        _id: ID!
        name: String
        bio: String
    }

    type Response {
        success: Boolean
    }

    type Query {
        products: [Product]
        product(id: ID!): Product
        me: Me
    }

    type Mutation {
        """Super Mutation \`addProduct\`"""
        addProduct(title: String!, category: String!) : Product
        updateProduct(productId: ID!, input: ProductInput) : Product
        removeProduct(productId: String!) : Response
        updateMe(bio: String!): Me
    }
`;