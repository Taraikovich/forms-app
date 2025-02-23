'use client';

import DashboardNav from '@/components/dashboard-nav';
import apiClient from '@/lib/apiClient';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

type Form = {
  id: string;
  templateId: string;
  creatorId: string;
  template: {
    title: string;
  };
  creator: {
    name: string;
  };
};

export default function FormListPage() {
  const [formList, setFormList] = useState<Form[]>([]);

  useEffect(() => {
    async function getForms() {
      const res = await apiClient.get('forms/by-template-author');
      setFormList(res);
    }
    getForms();
  }, []);

  return (
    <main>
      <DashboardNav />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Filled by</th>
          </tr>
        </thead>
        <tbody>
          {formList.length ? (
            formList.map((item: Form) => (
              <tr key={item.id}>
                <td>
                  <Link href={`/dashboard/forms/${item.id}`}>
                    {item.template.title}
                  </Link>
                </td>
                <td>{item.creator.name}</td>
              </tr>
            ))
          ) : (
            <tr className="text-center">
              <td colSpan={2}>Loading...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </main>
  );
}
