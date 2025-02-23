import apiClient from '@/lib/apiClient';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
} from 'react-bootstrap';

type Answer = {
  id: string;
  formId: string;
  questionId: string;
  type: 'single_line' | 'multi_line' | 'integer' | 'checkbox';
  single_line?: string | null;
  multi_line?: string | null;
  integer?: number | null;
  checkbox?: boolean | null;
  question: {
    id: string;
    title: string;
    description: string;
    type: 'single_line' | 'multi_line' | 'integer' | 'checkbox';
    templateId: string;
  };
};

type FormResponse = {
  id: string;
  templateId: string;
  creatorId: string;
  creator: { name: string };
  answers: Answer[];
  template: {
    id: string;
    title: string;
    description: string;
    image: string;
    createdAt: string;
  };
};

export default async function FormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const form: FormResponse = await apiClient.get(`/forms/form/${id}`);

  return (
    <Container>
      <h2 className="mt-4">{form.template.title}</h2>
      <h2>
        <b>{form.creator.name}</b> filled out the form
      </h2>
      {form.answers.map((answer: Answer) => (
        <Card key={answer.id} className="mb-3">
          <CardBody>
            <CardTitle>{answer.question.title}</CardTitle>
            <CardText>{answer.question.description}</CardText>
            <strong>Answer:</strong> {renderAnswer(answer)}
          </CardBody>
        </Card>
      ))}
    </Container>
  );
}

function renderAnswer(answer: Answer) {
  switch (answer.type) {
    case 'single_line':
      return <p>{answer.single_line}</p>;
    case 'multi_line':
      return <pre>{answer.multi_line}</pre>;
    case 'integer':
      return <p>{answer.integer}</p>;
    case 'checkbox':
      return <p>{answer.checkbox ? 'Yes' : 'No'}</p>;
    default:
      return <p>-</p>;
  }
}
