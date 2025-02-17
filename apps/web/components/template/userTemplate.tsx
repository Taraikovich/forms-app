'use client';

import apiClient from '@/lib/apiClient';
import useAuthApiFetch from '@/lib/authApiFetch';
import { BACKEND_URL } from '@/lib/constants';
import { getSession } from '@/lib/session';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Form, Pagination, Table } from 'react-bootstrap';

type Template = {
  id: string;
  title: string;
  description: string;
  totalCount: number;
};

export default function UserTemplates() {
  const [checkedTemplates, setCheckedTemplates] = useState<string[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { loading, data, setConfig } = useAuthApiFetch();
  const currentPage = data ? data.currentPage : 1;

  const page = searchParams.get('page');

  async function handleDelete() {
    if (checkedTemplates.length === 0) return;
    await apiClient.delete('/templates/delete', checkedTemplates);
    setConfig({
      url: `${BACKEND_URL}/templates/user-templates?page=${page || 1}`,
    });
  }

  useEffect(() => {
    async function fetchUserTemplates() {
      const session = await getSession();
      if (session?.user) {
        setConfig({
          url: `${BACKEND_URL}/templates/user-templates?page=${page || 1}`,
        });
      }
    }
    fetchUserTemplates();
  }, [page]);

  useEffect(() => {
    if (data && data.templates) {
      setTemplates(data.templates);
    }
  }, [data]);

  return (
    <>
      <Link href="/template/create">
        <Button variant="outline-primary" size="sm" className="m-1">
          <i className="bi bi-plus"> </i>Create template
        </Button>
      </Link>
      <Button variant="outline-danger" size="sm" onClick={handleDelete}>
        <i className="bi bi-trash3"> </i>Delete
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {!loading && templates.length ? (
            templates.map((template: Template, index: number) => (
              <tr key={template.id || index}>
                <td style={{ width: '10px' }}>
                  <Form.Check
                    type="checkbox"
                    value={template.id}
                    onChange={(e) =>
                      setCheckedTemplates((prev) => [...prev, e.target.value])
                    }
                  />
                </td>
                <td>
                  <Link href={`/template/${template.id}`} passHref>
                    {template.title}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center">
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination size="sm">
        {data &&
          data.count &&
          Array.from({ length: data.totalPages }, (_, index) => {
            const number = index + 1;
            return (
              <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => router.push(`dashboard?page=${number}`)}
              >
                {number}
              </Pagination.Item>
            );
          })}
      </Pagination>
    </>
  );
}
