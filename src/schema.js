import {gql} from "apollo-server-express";

export const typeDefs = gql`
    type Todo {
        id: ID!
        title: String
        category: String
    }
    
    type Image {
        url: String
        description: String
        thumbnailUrl(width: Int, height: Int): String
    }
    
    enum ProductDescriptionFormat {
        TEXT
        HTML
    }
    
    enum Locales {
        EN
        FR
        DE
    }
    
    type Product {
        name: String!
        description(format: ProductDescriptionFormat, locale: Locales = EN): String
        imageObject: Image @deprecated(reason: "Use \`image\`.")
        image: Image
        imageUrl: String
    }

    type Query {
        todos: [Todo]
        todo(id: ID!): Todo
        helloTwo: String
        product(id: ID!): Product
    }

    type Response {
        success: Boolean
    }

    type Mutation {
        addTodo(title: String!, category: String!) : Todo
        removeTodo(todoId: Int!) : Response
    }
`;