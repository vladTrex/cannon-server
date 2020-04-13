import {gql} from "apollo-server-express";

export const typeDefs = gql`
    enum AllowedCategories {
        BUSINESS
        PERSONAL
        GROUP
    }

    input ProductInput {
        title: String!
        category: AllowedCategories!
        email: String
        phone: String
        address: String
        size: Int
    }

    interface Product {
        _id: ID
        title: String
        category: String
    }

    type Business implements Product {
        _id: ID
        title: String
        category: String

        phone: String
        address: String
    }

    type Personal implements Product {
        _id: ID
        title: String
        category: String

        email: String
    }

    type Group implements Product {
        _id: ID
        title: String
        category: String
    
        size: Int
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
        addProduct(input: ProductInput) : Product
        updateProduct(productId: ID!, input: ProductInput) : Product
        removeProduct(productId: String!) : Response
        updateMe(bio: String!): Me
    }
`;