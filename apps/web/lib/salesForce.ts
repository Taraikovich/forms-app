'use server';

import { Connection } from 'jsforce';
import { revalidatePath } from 'next/cache';

async function SFClient() {
  const conn = new Connection();

  await conn.login(
    process.env.SF_USERNAME!,
    process.env.SF_PASSWORD! + process.env.SF_TOKEN!
  );

  return conn;
}

async function addSForce(
  Name: string,
  UserID: string,
  FirstName: string,
  LastName: string,
  Email: string
) {
  try {
    const conn = await SFClient();

    const account = await conn.sobject('Account').create({
      Name,
      UserID__c: UserID,
    });

    const createRes = await conn.sobject('Contact').create({
      FirstName,
      LastName,
      Email,
      AccountId: account.id,
    });

    if (createRes.success) revalidatePath('/dashboard/contacts');

    return account;
  } catch (err) {
    console.log(err);
  }
}

async function getAccount(
  UserID: string
): Promise<{ FirstName: string; LastName: string; Email: string } | undefined> {
  try {
    const conn = await SFClient();

    const query = `
  SELECT (SELECT Id, FirstName, LastName, Email FROM Contacts)
  FROM Account
  WHERE UserId__c = '${UserID}'
  LIMIT 1
`;

    const queryRes = await conn.query(query);

    if (queryRes.records[0] && queryRes.records[0].Contacts) {
      const { FirstName, LastName, Email } =
        queryRes.records[0].Contacts.records[0];

      return { FirstName, LastName, Email };
    } else {
      console.log('Not found');
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateContact(
  UserID: string,
  newData: { FirstName: string; LastName: string; Email: string }
) {
  try {
    const conn = await SFClient();

    const query = `
      SELECT Id, (SELECT Id FROM Contacts LIMIT 1)
      FROM Account
      WHERE UserId__c = '${UserID}'
      LIMIT 1
    `;

    const queryRes = await conn.query(query);

    console.log(queryRes);

    if (!queryRes.records.length) {
      return null;
    }

    const contacts = queryRes.records[0]?.Contacts?.records;
    if (!contacts?.length) {
      return null;
    }

    const contactId = contacts[0].Id;

    const updateRes = await conn.sobject('Contact').update({
      Id: contactId,
      ...newData,
    });

    if (updateRes.success) revalidatePath('/dashboard/contacts');
    return updateRes;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export { addSForce, getAccount, updateContact };
