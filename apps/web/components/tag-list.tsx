import { BACKEND_URL } from '@/lib/constants';
import axios from 'axios';
import { Badge, Stack } from 'react-bootstrap';

export default async function TagList() {
  const res = await axios.get(`${BACKEND_URL}/templates/top-tags`);

  return (
    <>
      <h2 className="mt-3 text-center">Popular tags</h2>

      <Stack
        direction="horizontal"
        gap={3}
        className="flex-wrap justify-content-center m-5"
      >
        {res.data &&
          res.data.map((tag: { id: string; name: string }) => (
            <Badge
              key={tag.id}
              pill
              bg="primary"
              style={{ fontSize: '1.3rem' }}
            >
              {tag.name}
            </Badge>
          ))}
      </Stack>
    </>
  );
}
