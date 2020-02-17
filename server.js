import express from 'express';
import {ApolloServer, gql} from 'apollo-server-express';
import {execute, subscribe} from 'graphql';
import {createServer} from 'http';
import {SubscriptionServer} from 'subscriptions-transport-ws';

import {resolvers} from './src/resolvers';
import {typeDefs} from './src/schema';

const PORT = 4000;
const WS_PORT = 5000;

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

const mocks = {
    Product: () => ({
        imageUrl: () => null
    })
};

// Setup Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks,
    mockEntireSchema: false
});
const app = express();
server.applyMiddleware({ app, cors: corsOptions });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);