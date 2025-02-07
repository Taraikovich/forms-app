import Link from 'next/link';
import { Card, CardBody, CardText, CardTitle } from 'react-bootstrap';
import SignInForm from '@/components/signin-form';
import { BACKEND_URL } from '@/lib/constants';

export default function SignInPage() {
  return (
    <Card>
      <CardBody>
        <CardTitle className="text-center fw-bold">Sign In Page</CardTitle>
        <SignInForm />
        <hr />
        <a href={`${BACKEND_URL}/auth/google/login`}>Sign In With Google</a>
        <CardText className="text-center">
          <Link href="#">Forgot your password?</Link>{' '}
        </CardText>
        <CardText className="text-center">
          Don't have an account? <Link href="/auth/signup">Sign Up</Link>
        </CardText>
      </CardBody>
    </Card>
  );
}
