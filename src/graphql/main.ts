import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
const { ApolloServer } = require('apollo-server');
import path from "path";

const allTypes: any[] = fileLoader(path.join(__dirname, "../../src/graphql/queries/*.gql"));
// var resolverPath = path.join(__dirname, "../../src/graphql/resolvers/*.ts");
var resolverPath = path.join(__dirname, "../../out/graphql/resolvers/*.js");
const allResolvers: any[] = fileLoader(resolverPath);
const typeDefs: string = mergeTypes(allTypes);
const resolvers: any = mergeResolvers(allResolvers);
const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });
  
  server.listen().then(({ url }) => {
    console.log(`🚀 ApolloServer : ${url}`);
  });

export function makeGrpahqlHTTP() {
  return {
    schema: schema,
    graphiql: true,
  };
}
