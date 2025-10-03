'use server';

import { headers } from 'next/headers';

export async function getCurrentUser() {
  const meRequest = await fetch('http://localhost:3000/api/users/me', {
    credentials: 'include',
    method: 'get',
    headers: await headers()
  });

  const { user } = await meRequest.json();

  return user;
}
