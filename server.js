import express from 'express';
import {ApolloServer, gql} from 'apollo-server-express';
import {execute, subscribe} from 'graphql';
import {createServer} from 'http';
import {SubscriptionServer} from 'subscriptions-transport-ws';

import {resolvers} from './src/resolvers';

const PORT = 4000;
const WS_PORT = 5000;

export const typeDefs = gql`
    type Todo {
        id: ID!
        title: String
        category: String
    }
    
    input NoteInput {
        todeId: ID!
        details: String
    }
    
    type Note {
        id: ID!
        details: String
    }

    type Query {
        todos: [Todo]
        todo(id: ID!): Todo  
    }

    type Response {
        success: Boolean
    }
    
    type Mutation {
        addTodo(title: String!, category: String!) : Todo
        removeTodo(todoId: Int!) : Response
        addNote(note: NoteInput!) : Note
    }
    
    type Subscription {
        noteAdded(todoId: ID!): Note
    }
`;
const schema = typeDefs;

// Create WebSocket listener server
const websocketServer = createServer((request, response) => {
    response.writeHead(200);
    response.end();
});

// Bind it to port and start listening
websocketServer.listen(WS_PORT, () => {
    console.log(`🚀 Websocket Server is now running on http://localhost:${WS_PORT}`);

    new SubscriptionServer({schema, execute, subscribe}, {server: websocketServer, path: 'subscriptions'});
});

// CORS
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

// Setup Server
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app, cors: corsOptions });



app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);