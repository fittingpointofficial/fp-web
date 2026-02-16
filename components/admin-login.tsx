'use client';

import { useState } from 'react';

export function AdminLogin() {
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: form.get('username'), password: form.get('password') })
    });

    if (!res.ok) {
      setError('Invalid credentials');
      return;
    }

    window.location.reload();
  };

  return (
    <form onSubmit={submit} className="mx-auto mt-20 w-[min(420px,92vw)] space-y-3 rounded-2xl bg-white p-6 shadow">
      <h1 className="font-heading text-3xl">Admin Login</h1>
      <input name="username" required placeholder="Username" className="w-full rounded-xl border px-4 py-3" />
      <input name="password" required type="password" placeholder="Password" className="w-full rounded-xl border px-4 py-3" />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button className="rounded-full bg-fp-primary px-6 py-3 text-white">Login</button>
    </form>
  );
}
