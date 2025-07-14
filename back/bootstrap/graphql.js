const { makeExecutableSchema } = require("@graphql-tools/schema")
const { ApolloServer } = require("apollo-server-hapi")
const { typeDefs, resolvers } = require("../graphql")
const di = require('../bootstrap/di')

async function setupGraphQL(server) {
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const apollo = new ApolloServer({
    schema,
    context: () => ({ di }),
    introspection: true,
    playground: true,
  })

  await apollo.start()
  console.log("Graphql server started...")
  await apollo.applyMiddleware({ app: server })
}

module.exports = { setupGraphQL }
