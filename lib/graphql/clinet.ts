import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject
} from "apollo-boost";
import fetch from "isomorphic-unfetch";

let apolloClient: ApolloClient<any> | null = null;

if (!process.browser) {
  // @ts-ignore
  global.fetch = fetch;
}

const createApolloClient = (initialState: NormalizedCacheObject) => {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: new HttpLink({
      uri: "/api",
      credentials: "same-origin"
    }),
    cache: new InMemoryCache().restore(initialState)
  });
};

export const initApollo = (initialState: any = {}) => {
  if (!process.browser) {
    return createApolloClient(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
};
