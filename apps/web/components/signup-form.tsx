'use client';

import { useActionState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { signUp } from '@/lib/auth';
import FormInput from '@/components/form-inpit';

export default function SignUpForm() {
  const [state, formAction, isPanding] = useActionState(signUp, undefined);

  return (
    <Form action={formAction} style={{ minWidth: '350px' }}>
      {state?.message && <Alert variant="danger">{state?.message}</Alert>}

      <FormInput label="User name" type="name" state={state} />
      <FormInput label="Email address" type="email" state={state} />
      <FormInput label="Password" type="password" state={state} />

      <Button
        variant="outline-primary"
        type="submit"
        className="w-100"
        aria-disabled={isPanding}
      >
        {isPanding ? 'Submiting...' : 'Sign Up'}
      </Button>
    </Form>
  );
}
