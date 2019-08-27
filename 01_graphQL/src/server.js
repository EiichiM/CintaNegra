require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const {makeExecutableSchema}= require("graphql-tools")
const typeDefs = importSchema('src/schema.graphql');
const verifyToken = require("./services/verifyToken");
const {AuthDirective}= require ("./services/AuthDirective");

const mongoose = require("mongoose");

mongoose.connect(process.env.URL, { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('Conectado a Mongo'); }
})

//Mutations
const { createUser, login } = require('./resolvers/Mutations/auth');
const { createEvent } = require('./resolvers/Mutations/events');

//Querys
const { getAllEvents, getIdEvent } = require("./resolvers/Querys/event");


const resolvers = {
    Query: {
        getAllEvents,
        getIdEvent
    },
    Mutation: {
        createUser,
        login,
        createEvent
    }
}

const schema = makeExecutableSchema ({
    typeDefs,
    resolvers,
    schemaDirectives:{
        auth : AuthDirective
    }
})
const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: async ({ request }) => verifyToken(request)
})
server.start(() => console.log('Graphql corriendo en puerto: 4000'))