'use client';

import Link from 'next/link';
import { Button, Tab, Tabs } from 'react-bootstrap';

export default function PageTabs() {
  return (
    <Tabs
      defaultActiveKey="templates"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="templates" title="Templates">
        <Link href="/template/create">
          <Button variant="outline-primary" size="sm" className="m-1">
            <i className="bi bi-plus"> </i>Create template
          </Button>
        </Link>
        <Button variant="outline-danger" size="sm">
          <i className="bi bi-trash3"> </i>Delete
        </Button>
      </Tab>
      <Tab eventKey="forms" title="Forms">
        Tab content for Profile
      </Tab>
    </Tabs>
  );
}
