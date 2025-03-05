'use client';

import DashboardNav from '@/components/dashboard-nav';
import apiClient from '@/lib/apiClient';
import { getTickets } from '@/lib/jira';
import React, { useEffect, useState } from 'react';

interface JiraIssue {
  id: string;
  self?: string;
  key?: string;
  fields?: {
    summary?: string;
    status?: {
      name?: string;
    };
  };
}

export default function SupportPage() {
  const [issues, setIssues] = useState<JiraIssue[]>([]);

  useEffect(() => {
    async function getEmail() {
      const email = await apiClient.get('/user/email');
      return email.email;
    }

    async function getIssues() {
      const email = await getEmail();

      const issues = await getTickets(email);

      if (issues) {
        setIssues(issues);
      }
    }

    getIssues();
  }, []);

  return (
    <div>
      <DashboardNav />
      <h1>Tickets:</h1>
      {!issues.length && <p>Loading...</p>}
      <ul>
        {issues.map((issue: JiraIssue) => (
          <li key={issue.id}>
            <a
              href={`https://taraikovi4.atlassian.net/browse/${issue.key}`}
              target="_blank"
              rel="noreferrer"
            >
              {issue.fields?.summary}
            </a>{' '}
            ({issue.fields?.status?.name})
          </li>
        ))}
      </ul>
    </div>
  );
}
