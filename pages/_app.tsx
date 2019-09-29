import React from "react";
import App from "next/app";
import withApolloClient from "../lib/graphql/withApolloClient";
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";

class ApolloApp extends App<{ apolloClient: ApolloClient<any> }> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

export default withApolloClient(ApolloApp);
