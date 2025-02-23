import CreateForm from '@/components/form/create-form';
import BackButton from '@/components/template/back-button';
import { BACKEND_URL } from '@/lib/constants';
import axios from 'axios';
import { format } from 'date-fns';
import Image from 'next/image';
import { Col, Container, Row } from 'react-bootstrap';
import Markdown from 'react-markdown';

async function fetchTemplate(id: string) {
  const response = await axios.get(`${BACKEND_URL}/templates/template/${id}`);

  return response.data;
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const template = await fetchTemplate(id);

  return (
    <main>
      <h1 className="text-center">{template.title}</h1>
      <Container>
        <Row sm={1} md={2}>
          <Col
            className=" d-flex justify-content-xl-between align-items-start"
            md={5}
          >
            <BackButton />
            <Image
              src={template.image}
              alt={template.title}
              width={300}
              height={200}
              priority={true}
              style={{ objectFit: 'cover' }}
            />
          </Col>
          <Col md={7}>
            <Markdown>{template.description}</Markdown>
            <p>
              Created by <b>{template.creator.name}</b> at{' '}
              <b>{format(template.createdAt, 'yyyy-MM-dd hh:mm')}</b>
            </p>
            <p>
              Topic: <b>{template.topic.name}</b>
            </p>
          </Col>
        </Row>
      </Container>
      <CreateForm templateId={id} questions={template.questions} />
    </main>
  );
}
