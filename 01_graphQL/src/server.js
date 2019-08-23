const { GraphQLServer } = require("graphql-yoga");
const { importSchema } = require("graphql-import");
const typeDefs = importSchema("./schema.graphql")


const resolvers = {
    Query: {
        saludo: (root, args) => `Hola ${args.name}`
    },
    Mutation: {
        persona: (root, args) => args.edad
    }
}


const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log(`GraphQL esta corriendo`))