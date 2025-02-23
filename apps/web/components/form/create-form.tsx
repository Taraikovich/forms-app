'use client';

import { useForm } from 'react-hook-form';
import { AnswerType, Question } from '../template/question-item';
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Form,
  FormCheck,
  FormControl,
} from 'react-bootstrap';
import apiClient from '@/lib/apiClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateForm({
  templateId,
  questions,
}: {
  templateId: string;
  questions: Question[];
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: {
    [key: string]: string | number | boolean;
  }) => {
    const formattedData = Object.keys(data).map((answer: string) => ({
      templateId,
      questionId: answer,
      type: questions.find((q) => q.id === answer)?.type,
      [String(questions.find((q) => q.id === answer)?.type)]: data[answer],
    }));
    setLoading(true);
    try {
      await apiClient.post('forms/save-form', formattedData);
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        {questions.map((question) => (
          <Card key={question.id} className="m-2">
            <CardBody>
              <CardTitle>{question.title}</CardTitle>
              <CardText>{question.description}</CardText>
              <Input
                answerType={question.type || 'single_line'}
                name={`${question.id}`}
                register={register}
                errors={errors}
              />
            </CardBody>
          </Card>
        ))}
        <Button type="submit" variant="primary" className="mt-3">
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </Container>
    </Form>
  );
}

function Input({
  answerType,
  name,
  register,
  errors,
}: {
  answerType: AnswerType;
  name: string;
  register: any;
  errors: any;
}) {
  const validationRules =
    answerType === 'integer'
      ? { required: 'This field is required', valueAsNumber: true }
      : answerType === 'single_line'
        ? { required: 'This field is required' }
        : answerType === 'multi_line'
          ? { required: 'This field is required' }
          : {};

  return (
    <>
      {answerType === 'single_line' && (
        <FormControl type="text" {...register(name, validationRules)} />
      )}
      {answerType === 'multi_line' && (
        <FormControl
          as="textarea"
          rows={3}
          {...register(name, validationRules)}
        />
      )}
      {answerType === 'integer' && (
        <FormControl type="number" {...register(name, validationRules)} />
      )}
      {answerType === 'checkbox' && (
        <FormCheck type="checkbox" label="Yes" {...register(name)} />
      )}
      {errors[name] && <p className="text-danger">{errors[name]?.message}</p>}
    </>
  );
}
