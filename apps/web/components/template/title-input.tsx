'use client';

import { Form, InputGroup } from 'react-bootstrap';
import { UseFormRegister } from 'react-hook-form';
import FormGroup from './form-group';
import { Inputs } from './create-template-form';

interface TitleInputProps {
  register: UseFormRegister<Inputs>;
}

export default function TitleInput({ register }: TitleInputProps) {
  return (
    <FormGroup label="Title:">
      <InputGroup hasValidation>
        <Form.Control
          type="text"
          placeholder="Enter title"
          maxLength={30}
          required
          {...register('title', { required: true })}
        />
        <Form.Control.Feedback type="invalid">
          * This field is required
        </Form.Control.Feedback>
      </InputGroup>
    </FormGroup>
  );
}
