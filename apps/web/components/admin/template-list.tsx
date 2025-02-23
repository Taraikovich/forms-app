'use client';

import apiClient from '@/lib/apiClient';
import { format } from 'date-fns';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Alert, Button, Form, Pagination, Table } from 'react-bootstrap';

type Template = {
  id: string;
  title: string;
  creator: { name: string };
  createdAt: string;
};

export default function TemplateList() {
  const [templates, setTemplates] = useState<Template[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState('1');
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    async function getTemplates() {
      try {
        const res = await apiClient.get(`/templates/all?page=${page}`);
        setTemplates(res.templates);
        setTotalPages(res.totalPages);
      } catch {
        setError('Failed to load templates');
      }
    }
    getTemplates();
  }, [page]);

  useEffect(() => {
    const page = searchParams.get('page') || '1';
    setPage(page);
  }, [searchParams]);

  async function handleDelete() {
    await apiClient.delete('/templates/delete', selectedTemplates);
    const res = await apiClient.get(`/templates/all?page=${page}`);
    setTemplates(res.templates);
    setTotalPages(res.totalPages);
    setSelectedTemplates([]);
  }

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <>
      <Button
        variant="danger"
        size="sm"
        className="mb-2"
        onClick={handleDelete}
      >
        Delete
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: '10px' }}>#</th>
            <th>Title</th>
            <th>Creator</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {templates.length ? (
            templates.map((template: Template) => (
              <tr key={template.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedTemplates.includes(template.id)}
                    value={template.id}
                    onChange={(e) =>
                      setSelectedTemplates((prev) =>
                        prev.includes(e.target.value)
                          ? prev.filter((id) => id !== e.target.value)
                          : [...prev, e.target.value]
                      )
                    }
                  />
                </td>
                <td>
                  <Link href={`/template/edit/${template.id}`}>
                    {template.title}
                  </Link>
                </td>
                <td>{template.creator.name}</td>
                <td>{format(template.createdAt, 'yyyy-MM-dd hh:mm')}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination size="sm">
        {totalPages &&
          Array.from({ length: totalPages }, (_, index) => {
            const number = index + 1;
            return (
              <Pagination.Item
                key={number}
                active={number === Number(page)}
                onClick={() => router.push(`${path}?page=${number}`)}
              >
                {number}
              </Pagination.Item>
            );
          })}
      </Pagination>
    </>
  );
}
