'use client';

import { PropsWithChildren } from 'react';
import { Form } from 'react-bootstrap';

interface FormGroupProps extends PropsWithChildren {
  label: string;
}

export default function FormGroup({ children, label }: FormGroupProps) {
  return (
    <Form.Group
      className="mb-3 border border-1 border-gray rounded p-2"
      controlId="formBasicEmail"
    >
      <Form.Label className="fw-bold">{label}</Form.Label>
      {children}
    </Form.Group>
  );
}
