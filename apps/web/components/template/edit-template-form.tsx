'use client';

import { useEffect, useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import AddQuestion from '@/components/template/add-question';
import BackButton from '@/components/template/back-button';
import ImagePicker from '@/components/template/image-picker';
import TitleInput from '@/components/template/title-input';
import DescriptionInput from '@/components/template/description-input';
import TopicSelector from '@/components/template/topic-selector';
import { Question } from '@/components/template/question-item';
import uploadImage from '@/lib/uploadImage';
import InputTags from './tag-input';
import apiClient from '@/lib/apiClient';
import { useRouter } from 'next/navigation';

export type Inputs = {
  title: string;
  description: string;
  topic: string;
  image: FileList;
  tags: string[];
};

export default function EditTemplateForm({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState<{ id: number; name: string }[] | []>([]);
  const [questions, setQuestions] = useState<Question[] | []>([]);
  const [validated, setValidated] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Inputs>();

  useEffect(() => {
    async function getTemplate() {
      setLoading(true);

      try {
        const res = await apiClient.get(`/templates/template/${id}`);
        const { title, description, topic, image, tags, questions } = res;
        setImageUrl(image);
        setTags(tags);
        setQuestions(questions);

        reset({
          title,
          description,
          topic: topic.id,
          tags,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getTemplate();
  }, [id, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const imageFile = data.image.item(0);
    const newImageUrl = imageFile ? await uploadImage(imageFile) : imageUrl;

    const template = {
      title: data.title,
      description: data.description,
      image: newImageUrl,
      topic: data.topic,
      tags: data.tags ? [...data.tags] : [],
      questions,
    };

    setLoading(true);

    try {
      await apiClient.put(`/templates/update/${id}`, template);
      router.back();
    } catch (error) {
      console.log(error);
      setError(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
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
      <h1 className="text-center">Template editing {loading && <Spinner />}</h1>
      <TitleInput register={register} />
      <DescriptionInput register={register} control={control} />
      <TopicSelector register={register} />
      <ImagePicker errors={errors} register={register} imageUrl={imageUrl} />
      <InputTags register={register} existTags={tags} />
      <AddQuestion questions={questions} onAddQuestion={setQuestions} />
      {!questions.length && validated && (
        <Alert variant="danger">Please, add some questions!</Alert>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <BackButton />
      <Button className="m-2" type="submit">
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </Form>
  );
}
