import { ApolloServer, gql } from "apollo-server-micro";

// ここからGraphQLのモックの定義
const typeDefs = gql`
  type Query {
    hello: String
    users: [User]
  }
  type User {
    id: Int!
    name: String!
  }
`;

const users = [
  {
    id: 1,
    name: "tarou"
  },
  {
    id: 2,
    name: "zirou"
  }
];

const resolvers = {
  Query: {
    hello: () => "world",
    users: () => users
  }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export default apolloServer.createHandler({ path: "/api" });
export const config = {
  api: {
    bodyParser: false
  }
};
