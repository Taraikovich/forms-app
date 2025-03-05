'use server';

import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: process.env.JIRA_HOST!,
  authentication: {
    basic: {
      email: process.env.JIRA_EMAIL!,
      apiToken: process.env.JIRA_TOKEN!,
    },
  },
});

const getAccountId = async (email: string) => {
  const { accountId } = await client.users.createUser({
    emailAddress: email,
    products: ['jira-software'],
  });

  return accountId;
};

const createIssue = async (data: {
  description: string;
  email: string;
  link: string;
  priority: string;
  summary: string;
}) => {
  try {
    const accountId = await getAccountId(data.email);

    const description = {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Description: ',
              marks: [{ type: 'strong' }],
            },
            {
              type: 'text',
              text: data.description,
              marks: [{ type: 'em' }],
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: `🔗  ${process.env.NEXT_PUBLIC_API_URL}${data.link}`,
              marks: [
                {
                  type: 'link',
                  attrs: {
                    href: `${process.env.NEXT_PUBLIC_API_URL}${data.link}`,
                  },
                },
              ],
            },
          ],
        },
      ],
    };

    const issue = await client.issues.createIssue({
      fields: {
        project: { key: 'BTS' },
        summary: data.summary,
        description,
        issuetype: { name: 'Task' },
        reporter: { id: accountId },
        priority: { name: data.priority },
      },
    });
    return issue;
  } catch (error) {
    console.error(error);
  }
};

async function getTickets(email: string) {
  try {
    const { accountId } = await client.users.createUser({
      emailAddress: email,
      products: ['jira-software'],
    });

    const response = await client.issueSearch.searchForIssuesUsingJql({
      jql: `project = BTS AND reporter = "${accountId}" ORDER BY created DESC`,
      maxResults: 10,
      fields: ['summary', 'status', 'self'],
    });

    if (response) {
      return response.issues;
    }

    return null;
  } catch (error) {
    console.error(error);
  }
}

export { createIssue, getTickets };
