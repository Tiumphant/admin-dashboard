// import Image from "next/image";

// export default function Home() {
//   return (
//    <div>
//     <h1>Welcome to next js website

//     </h1>
//    </div>
//   );
// }
'use client';
import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: { city: string };
}

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    const result = users.filter(
      u => u.name.toLowerCase().includes(lower) || u.address.city.toLowerCase().includes(lower)
    );
    setFiltered(result);
  }, [search, users]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">User Dashboard</h1>
      <input
        type="text"
        placeholder="Search by name or city..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <ul className="space-y-2">
        {filtered.map(user => (
          <li key={user.id} className="p-4 border rounded shadow">
            <p><strong>{user.name}</strong></p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>City: {user.address.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
