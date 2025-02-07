import { deleteSession, getSession } from '@/lib/session';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default async function SignInButton() {
  const session = await getSession();

  return (
    <div>
      {!session || !session.user ? (
        <>
          <Link href="/auth/signin">SIgn In</Link>
          <Link href="/auth/signup">SIgn Up</Link>
        </>
      ) : (
        <>
          <p>{session.user.name}</p>
          <Button variant="light" onClick={deleteSession}>
            signout
          </Button>
        </>
      )}
    </div>
  );
}
