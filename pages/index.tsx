import React from "react";
import { useUsersQuery } from "../lib/graphql/graphql-client-api";

export default function Users() {
  const { loading, data } = useUsersQuery();

  return (
    <div>
      {!loading && data && data.users && (
        <ul>
          {data.users.map((u: { id: string; name: string }) => {
            return <li key={u.id}>{u.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
