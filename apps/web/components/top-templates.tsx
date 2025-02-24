import { BACKEND_URL } from '@/lib/constants';
import axios from 'axios';
import Link from 'next/link';
import { Table } from 'react-bootstrap';

export default async function TopTemplates() {
  const res = await axios.get(`${BACKEND_URL}/templates/top`);

  const data = res.data;

  return (
    <>
      <h2 className="mt-3 text-center">Top templates</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Forms Count</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map(
              (
                item: { id: string; title: string; _count: { forms: number } },
                index: number
              ) => (
                <tr key={item.title}>
                  <td>{index + 1}</td>
                  <td>
                    <Link href={`/template/${item.id}`} passHref>
                      {item.title}
                    </Link>
                  </td>
                  <td>{item._count.forms}</td>
                </tr>
              )
            )}
        </tbody>
      </Table>
    </>
  );
}
