import BackButton from '@/components/template/back-button';
import { AnswerType } from '@/components/template/question-item';
import { BACKEND_URL } from '@/lib/constants';
import { format } from 'date-fns';
import Image from 'next/image';
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Form,
  FormCheck,
  FormControl,
  Row,
} from 'react-bootstrap';
import Markdown from 'react-markdown';

type Question = {
  id: string;
  title: string;
  description: string;
  type: AnswerType;
};

export default async function TemplatePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const response = await fetch(`${BACKEND_URL}/templates/template/${id}`);

  if (!response.ok) {
    console.error(`Failed to fetch templates: ${response.statusText}`);
  }

  const data = await response.json();

  return (
    <main>
      <h1 className="text-center">{data.title}</h1>
      <Container>
        <Row sm={1} md={2}>
          <Col
            className=" d-flex justify-content-xl-between align-items-start"
            md={5}
          >
            <BackButton />
            <Image
              src={data.image}
              alt={data.title}
              width={300}
              height={200}
              priority={true}
              style={{ objectFit: 'cover' }}
            />
          </Col>
          <Col md={7}>
            <Markdown>{data.description}</Markdown>
            <p>
              Created by <b>{data.creator.name}</b> at{' '}
              <b>{format(data.createdAt, 'yyyy-MM-dd hh:mm')}</b>
            </p>
            <p>
              Topic: <b>{data.topic.name}</b>
            </p>
          </Col>
        </Row>
      </Container>
      <Form>
        <Container>
          {data.questions.map((question: Question) => (
            <Card key={question.id} className="m-2">
              <CardBody>
                <CardTitle>{question.title}</CardTitle>
                <CardText>{question.description}</CardText>
                <Input answerType={question.type} />
              </CardBody>
            </Card>
          ))}
        </Container>
      </Form>
    </main>
  );
}

function Input({ answerType }: { answerType: AnswerType }) {
  if (answerType === 'single_line') return <FormControl type="text" />;
  if (answerType === 'multi_line')
    return <FormControl as="textarea" rows={3} />;
  if (answerType === 'integer') return <FormControl type="number" />;
  if (answerType === 'checkbox')
    return <FormCheck type="checkbox" label="Yes" />;
}
