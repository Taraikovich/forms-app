import { BACKEND_URL } from '@/lib/constants';
import axios from 'axios';
import Link from 'next/link';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from 'react-bootstrap';

type Template = {
  id: string;
  image: string;
  title: string;
  creator: { name: string };
};

export default async function LatestTemplates() {
  const response = await axios.get(`${BACKEND_URL}/templates/latest`);
  const data = response.data;

  return (
    <>
      <h2 className="text-center">Latest templates</h2>
      <Container>
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
          {data.map((item: Template) => (
            <Col key={item.id}>
              <Card style={{ width: '100%' }}>
                <CardImg
                  variant="top"
                  src={item.image}
                  style={{ objectFit: 'cover', height: '150px', width: '100%' }}
                />
                <CardBody>
                  <CardTitle>{item.title}</CardTitle>
                  <CardText>Author: {item.creator.name}</CardText>
                  <Link href={`/template/${item.id}`}>
                    <Button variant="primary" size="sm">
                      Go to template
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
