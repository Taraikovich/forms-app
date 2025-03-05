import Link from 'next/link';
import { Button, Nav } from 'react-bootstrap';

export default function DashboardNav() {
  return (
    <Nav>
      <Link href="/dashboard">
        <Button variant="link">Templates</Button>
      </Link>
      <Link href="/dashboard/forms">
        <Button variant="link">Forms</Button>
      </Link>
      <Link href="/dashboard/contacts">
        <Button variant="link">Contacts</Button>
      </Link>
    </Nav>
  );
}
