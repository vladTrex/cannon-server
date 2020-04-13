export default `
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

    union PremiumProduct = Business | Group

    type Response {
        success: Boolean
    }

    type Query {
        products: [Product]
        product(id: ID!): Product
        allPremiumProducts: [PremiumProduct]
    }

    type Mutation {
        """Add Product Mutation \`addProduct\` returns type \`Product\`"""
        addProduct(input: ProductInput) : Product
        updateProduct(productId: ID!, input: ProductInput) : Product
        removeProduct(productId: String!) : Response
    }
`;