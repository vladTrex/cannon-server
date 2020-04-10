import {gql} from "apollo-server-express";

export const typeDefs = gql`
    enum AllowedCategories {
        BUSINESS
        PERSONAL
        GROUP
    }

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
        """Add Product Mutation \`addProduct\` returns type \`Product\`"""
        addProduct(title: String!, category: AllowedCategories!) : Product
        updateProduct(productId: ID!, input: ProductInput) : Product
        removeProduct(productId: String!) : Response
        updateMe(bio: String!): Me
    }
`;