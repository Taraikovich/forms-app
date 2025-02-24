'use server';

import { revalidatePath } from 'next/cache';
import { BACKEND_URL } from './constants';
import { getSession } from './session';

export default async function setTheme() {
  const session = await getSession();

  if (!session) return;

  try {
    const res = await fetch(`${BACKEND_URL}/user/theme/${session?.user.id}`, {
      method: 'PATCH',
    });
    const data = await res.json();
    console.log(data);
    revalidatePath('/');
  } catch (err) {
    console.error('Error fetching theme:', err);
  }
}
