import { Spinner } from 'react-bootstrap';

export default function Loading() {
  return (
    <h1 className="text-center">
      <Spinner animation="border" role="status" />
      Loading...
    </h1>
  );
}
