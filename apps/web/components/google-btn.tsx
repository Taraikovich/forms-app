import { BACKEND_URL } from '@/lib/constants';
import { PropsWithChildren } from 'react';
import { Button } from 'react-bootstrap';

export default function GoogleButton({ children }: PropsWithChildren) {
  return (
    <>
      <hr />
      <a href={`${BACKEND_URL}/auth/google/login`}>
        <Button variant="outline-primary" className="w-100 mb-3">
          <i className="bi bi-google"> </i>
          {children} with Google
        </Button>
      </a>
    </>
  );
}
