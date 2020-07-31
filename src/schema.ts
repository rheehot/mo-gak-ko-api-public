import * as path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(
  path.join(
    __dirname,
    process.env.NODE_ENV === "production" ? "/api/**/*.js" : "/api/**/*.ts"
  )
);

// ! return type이 GraphQLSchema일 때, index.ts의 GraphQLServer > Props > schema가 에러 발생
const schema: any = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers),
});

export default schema;
