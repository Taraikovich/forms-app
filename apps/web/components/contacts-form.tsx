'use client';

import { addSForce, updateContact } from '@/lib/salesForce';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
};

export default function ContactForm(props: {
  data:
    | {
        FirstName: string;
        LastName: string;
        Email: string;
      }
    | undefined;
}) {
  const [showForm, setShowForm] = useState(false);
  const { data } = props || {};
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    reset({
      firstName: data?.FirstName,
      lastName: data?.LastName,
      email: data?.Email,
    });
  }, [data?.Email, data?.FirstName, data?.LastName, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const session = await getSession();
    if (!session) redirect('/auth/signin');

    const { name, id } = session.user;
    const { firstName, lastName, email } = formData;

    try {
      if (data) {
        await updateContact(id, {
          FirstName: firstName,
          LastName: lastName,
          Email: email,
        });
      } else {
        await addSForce(name, id, firstName, lastName, email);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setShowForm(false);
    }
  };

  return (
    <>
      {!showForm && (
        <Button
          className="m-3"
          onClick={() => setShowForm((prev) => (prev = !prev))}
        >
          {data ? 'edit' : 'add'}
        </Button>
      )}

      {showForm && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="m-3">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              {...register('firstName', { required: true })}
            />
            {errors.firstName && (
              <span className="text-danger">* This field is required</span>
            )}
          </Form.Group>

          <Form.Group className="m-3">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              {...register('lastName', { required: true })}
            />
            {errors.lastName && (
              <span className="text-danger">* This field is required</span>
            )}
          </Form.Group>

          <Form.Group className="m-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              {...register('email', {
                required: '* This field is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '* Invalid email format',
                },
              })}
            />
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
          </Form.Group>

          <Button className="m-3" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </>
  );
}
