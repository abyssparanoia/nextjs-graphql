import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

export default function Users() {
  const { loading, data } = useQuery(GET_USERS);

  return (
    <div>
      {!loading && (
        <ul>
          {data.users.map((u: { id: string; name: string }) => {
            return <li key={u.id}>{u.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
