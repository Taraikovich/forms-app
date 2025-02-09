import Link from 'next/link';
import { Card, CardBody, CardText, CardTitle } from 'react-bootstrap';
import SignUpForm from '@/components/signup-form';
import GoogleButton from '@/components/google-btn';

export default function SignUpPage() {
  return (
    <Card>
      <CardBody>
        <CardTitle className="text-center fw-bold">Sign Up</CardTitle>
        <SignUpForm />
        <GoogleButton>Sign up</GoogleButton>
        <CardText className="text-center">
          Already have an account?
          <Link href="/auth/signin"> Sign In</Link>
        </CardText>
      </CardBody>
    </Card>
  );
}
