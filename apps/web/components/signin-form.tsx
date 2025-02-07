'use client';

import { useActionState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { signIn } from '@/lib/auth';
import FormInput from '@/components/form-inpit';

export default function SignInForm() {
  const [state, formAction, isPanding] = useActionState(signIn, undefined);

  return (
    <Form action={formAction} style={{ minWidth: '350px' }}>
      {state?.message && <Alert variant="danger">{state?.message}</Alert>}

      <FormInput label="Email address" type="email" state={state} />
      <FormInput label="Password" type="password" state={state} />

      <Button type="submit" className="mb-3 w-100" aria-disabled={isPanding}>
        {isPanding ? 'Submiting...' : 'Sign In'}
      </Button>
    </Form>
  );
}
