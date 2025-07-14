const { loadFilesSync } = require("@graphql-tools/load-files")
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge")
const path = require("path")
console.log("##.GraphQL setup...")

const typesArray = loadFilesSync(
  path.join(__dirname, "./schemas/**/*.graphql"),
)
const resolversArray = loadFilesSync(
  path.join(__dirname, "./resolvers/**/*.js"),
)

const typeDefs = mergeTypeDefs(typesArray)
const resolvers = mergeResolvers(resolversArray)

module.exports = { typeDefs, resolvers }
