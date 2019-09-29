import { ApolloServer, gql } from "apollo-server-micro";
import {
  MutationResolvers,
  QueryResolvers,
  Resolvers
} from "../../lib/graphql/graphql-resolver-types";
import fs from "fs";
import path from "path";

const typeDefs = fs
  .readFileSync(path.join(__dirname, "../../lib/graphql/schema.graphql"))
  .toString();

interface User {
  id: string;
  name: string;
}

const users: User[] = [
  {
    id: "hoge",
    name: "tarou"
  },
  {
    id: "fuga",
    name: "zirou"
  },
  {
    id: "fizz",
    name: "saburou"
  }
];

const Query: QueryResolvers = {
  user(_parent, args, _context, _info) {
    return users.find((user) => user.id === args.id) || null;
  },
  users() {
    return users;
  }
};

const Mutation: MutationResolvers = {
  addUser(_parent, args, _context, _info) {
    const newUser: User = {
      id: `ID____${args.name}`,
      name: args.name
    };
    users.push(newUser);
    return newUser;
  }
};

const resolvers: Resolvers = {
  Query,
  Mutation
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: resolvers as any
});

export default apolloServer.createHandler({ path: "/api" });
export const config = {
  api: {
    bodyParser: false
  }
};
