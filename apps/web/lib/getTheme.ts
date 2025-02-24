import { BACKEND_URL } from './constants';
import { getSession } from './session';

export default async function getTheme() {
  let theme = 'dark';

  const session = await getSession();

  if (!session) return theme;

  try {
    const res = await fetch(`${BACKEND_URL}/user/theme/${session?.user.id}`);
    const data = await res.json();
    theme = data.theme;
  } catch (err) {
    console.error('Error fetching theme:', err);
  }

  return theme;
}
