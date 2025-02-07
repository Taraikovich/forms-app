import { PropsWithChildren } from 'react';
import { Stack } from 'react-bootstrap';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <Stack
      gap={2}
      className="vh-100 col-md-5 mx-auto justify-content-center align-items-center"
    >
      {children}
    </Stack>
  );
}
