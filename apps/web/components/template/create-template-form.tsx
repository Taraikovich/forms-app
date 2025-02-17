'use client';

import { useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import AddQuestion from '@/components/template/add-question';
import BackButton from '@/components/template/back-button';
import ImagePicker from '@/components/template/image-picker';
import TitleInput from '@/components/template/title-input';
import DescriptionInput from '@/components/template/description-input';
import TopicSelector from '@/components/template/topic-selector';
import { Question } from '@/components/template/question-item';
import uploadImage from '@/lib/uploadImage';
import useAuthApiFetch from '@/lib/authApiFetch';
import { BACKEND_URL } from '@/lib/constants';
import { redirect } from 'next/navigation';
import InputTags from './tag-input';

export type Inputs = {
  title: string;
  description: string;
  topic: string;
  image: FileList;
  tags: string[];
};

export default function CreateTemplateForm() {
  const { error, data, loading, setConfig } = useAuthApiFetch();
  const [questions, setQuestions] = useState<Question[] | []>([]);
  const [validated, setValidated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (data) {
      redirect('/dashboard');
    }
  }, [data]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const imageFile = data.image.item(0);
    const imageUrl = imageFile ? await uploadImage(imageFile) : null;

    setConfig({
      url: `${BACKEND_URL}/templates/create`,
      method: 'POST',
      body: {
        title: data.title,
        description: data.description,
        image: imageUrl,
        topic: data.topic,
        tags: data.tags ? [...data.tags] : [],
        questions,
      },
    });
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit((data) => {
        if (questions.length) {
          onSubmit(data);
        } else {
          setValidated(true);
        }
      })}
    >
      <TitleInput register={register} />
      <DescriptionInput register={register} />
      <TopicSelector register={register} />
      <ImagePicker errors={errors} register={register} />
      <InputTags register={register} />
      <AddQuestion questions={questions} onAddQuestion={setQuestions} />
      {!questions.length && validated && (
        <Alert variant="danger">Please, add some questions!</Alert>
      )}

      {error && <Alert variant="danger">{JSON.stringify(error)}</Alert>}

      <BackButton />
      <Button className="m-2" type="submit">
        {loading ? 'Submitting' : 'Submit'}
      </Button>
    </Form>
  );
}
