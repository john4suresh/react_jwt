import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import useRefreshToken from '../hooks/useRefreshToken';

function Users() {
  const [users, setUsers] = useState();
  const  refresh  = useRefreshToken();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axios.get('/users', {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to diplay</p>
      )}

      <br />
      <button onClick={() => refresh()}>Refresh</button>
    </article>
  );
}

export default Users;
