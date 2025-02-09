import Link from 'next/link';
import { Card, CardBody, CardText, CardTitle } from 'react-bootstrap';
import SignInForm from '@/components/signin-form';
import GoogleButton from '@/components/google-btn';

export default function SignInPage() {
  return (
    <Card>
      <CardBody>
        <CardTitle className="text-center fw-bold">Sign In</CardTitle>
        <SignInForm />
        <GoogleButton>Sign in</GoogleButton>
        <CardText className="text-center">
          <Link href="#">Forgot your password?</Link>{' '}
        </CardText>
        <CardText className="text-center">
          Don&apos;t have an account? <Link href="/auth/signup">Sign Up</Link>
        </CardText>
      </CardBody>
    </Card>
  );
}
