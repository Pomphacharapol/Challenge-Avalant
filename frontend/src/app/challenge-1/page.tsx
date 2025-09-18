'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Challenge1() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/users?page=1&pageSize=10')
      .then(res => setUsers(res.data.items))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='p-10 flex flex-col justify-center gap-5'>
      <h1 className='text-center'>Challenge 1</h1>
      <h2 className='text-center'>Users</h2>
      <ul>
        {users.map(u => <li key={u.id}>{u.name} ({u.email})</li>)}
      </ul>
    </div>
  )
}
