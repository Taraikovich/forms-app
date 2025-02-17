'use client';

import { Tab, Tabs } from 'react-bootstrap';
import UserTemplates from './template/userTemplate';

export default function DashboardTabs() {
  return (
    <Tabs
      defaultActiveKey="templates"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="templates" title="Templates">
        <UserTemplates />
      </Tab>

      <Tab eventKey="forms" title="Forms">
        Tab content for Profile
      </Tab>
    </Tabs>
  );
}
