import { getProfile } from '@/lib/actions';

export default async function ProfilePage() {
  const res = await getProfile();

  return <h1>{res.message}</h1>;
}
