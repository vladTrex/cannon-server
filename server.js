import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import mongoose from 'mongoose';

import {resolvers} from './src/resolvers';
import {typeDefs} from './src/schema';

const PORT = 4000;

mongoose.connect('mongodb://warehouse_admin:s92ks9339p1U@ds155825.mlab.com:55825/warehouse_prod', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});

// CORS
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

// Setup Server
const server = new ApolloServer({
    typeDefs,
    resolvers
});
const app = express();
server.applyMiddleware({app, cors: corsOptions});

app.listen({port: PORT}, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);