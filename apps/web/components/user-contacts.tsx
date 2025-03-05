import { getAccount } from '@/lib/salesForce';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react';
import { Card } from 'react-bootstrap';
import ContactForm from './contacts-form';

export default async function UserContacts() {
  const session = await getSession();
  if (!session) redirect('/auth/signin');
  const contacts = await getAccount(session.user.id);

  return (
    <div>
      {contacts ? (
        <Card className="m-3 p-2">
          <p>
            <strong>First Name:</strong> {contacts.FirstName}
          </p>
          <p>
            <strong>Last Name:</strong> {contacts.LastName}
          </p>
          <p>
            <strong>Email:</strong> {contacts.Email}
          </p>
        </Card>
      ) : (
        <Card className="m-3 p-2">Please add your contacts</Card>
      )}
      <ContactForm data={contacts} />
    </div>
  );
}
