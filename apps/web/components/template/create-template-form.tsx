'use client';

import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import AddQuestion from '@/components/template/add-question';
import BackButton from '@/components/template/back-button';
import ImagePicker from '@/components/template/image-picker';
import InputTags from '@/components/template/tags-input';
import TitleInput from '@/components/template/title-input';
import DescriptionInput from '@/components/template/description-input';
import TopicSelector from '@/components/template/topic-selector';
import { Question } from '@/components/template/question-item';
import uploadImage from '@/lib/uploadImage';

export type Inputs = {
  title: string;
  description: string;
  topic: string;
  image: FileList;
  tags: string[];
};

export default function CreateTemplateForm() {
  const [questions, setQuestions] = useState<Question[] | []>([]);
  const [validated, setValidated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const imageUrl = await uploadImage(data.image.item(0));

    const formData = {
      title: data.title,
      describe: data.description,
      image: imageUrl,
      topic: data.topic,
      tags: data.tags,
      questions,
    };

    console.log(formData);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() && questions.length) {
      handleSubmit((data) => onSubmit(data, event))();
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      <TitleInput register={register} />
      <DescriptionInput register={register} />
      <TopicSelector register={register} />
      <ImagePicker errors={errors} register={register} />
      <InputTags register={register} />
      <AddQuestion questions={questions} onAddQuestion={setQuestions} />
      {!questions.length && validated && (
        <Alert variant="danger">Please, add some questions!</Alert>
      )}

      <BackButton />
      <Button className="m-2" type="submit">
        Submit
      </Button>
    </Form>
  );
}
