'use client';

import { useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { FormFields, FormState } from '@/lib/type';

export default function FormInput({
  label,
  type,
  state,
}: {
  label: string;
  type: FormFields;
  state: FormState;
}) {
  const [value, setValue] = useState('');

  return (
    <FloatingLabel label={label} className="mb-3">
      <Form.Control
        type={type}
        name={type}
        placeholder=""
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {state?.error?.[type] && (
        <ul className="p-0">
          {state?.error?.[type].map((error, i) => (
            <li
              key={i}
              className="list-unstyled bi bi-exclamation-octagon text-danger"
            >
              <span className="p-1">{error}</span>
            </li>
          ))}
        </ul>
      )}
    </FloatingLabel>
  );
}
