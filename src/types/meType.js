export default `
    type Me {
        _id: ID!
        name: String
        bio: String
    }

    type Query {
        me: Me
    }
    
    type Mutation {
        updateMe(bio: String!): Me
    }
`;