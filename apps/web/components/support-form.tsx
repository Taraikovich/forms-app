'use client';

import apiClient from '@/lib/apiClient';
import { createIssue } from '@/lib/jira';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  summary: string;
  description: string;
  priority: string;
};

function SupportForm() {
  const [show, setShow] = useState(false);
  const [sending, setSending] = useState(false);
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setSending(true);
      const email = await apiClient.get('/user/email');

      const formData = {
        ...email,
        link: pathname,
        ...data,
      };

      await createIssue(formData);
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setShow(false);
      setSending(false);
    }
  };

  return (
    <>
      <Button variant="primary" size="sm" className="me-3" onClick={handleShow}>
        <i className="bi bi-question-circle"> </i>Support
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create ticket</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Summary:</Form.Label>
              <Form.Control
                type="text"
                {...register('summary', { required: true })}
              />
              {errors.summary && (
                <span className="text-danger">* This field is required</span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register('description', { required: true })}
              />
              {errors.description && (
                <span className="text-danger">* This field is required</span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Priority:</Form.Label>
              <Form.Select {...register('priority')}>
                <option value="Low">Low</option>
                <option value="High">High</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button disabled={sending} variant="primary" type="submit">
              {sending ? 'Sending...' : 'Send'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default SupportForm;
