import { deleteSession, getSession } from '@/lib/session';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default async function SignInButton() {
  const session = await getSession();

  return (
    <div>
      {!session || !session.user ? (
        <>
          <Link href="/auth/signin">
            <Button variant="outline-primary m-1" size="sm">
              SIgn In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button variant="outline-primary m-1" size="sm">
              SIgn Up
            </Button>
          </Link>
        </>
      ) : (
        <>
          <span>{session.user.name}</span>
          <Button
            variant="outline-primary m-1"
            size="sm"
            onClick={deleteSession}
          >
            SIgn Out
          </Button>
        </>
      )}
    </div>
  );
}
