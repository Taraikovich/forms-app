import Link from 'next/link';
import { Button, Nav } from 'react-bootstrap';

export default function AdminNavBar() {
  return (
    <Nav>
      <Link href="/admin/users">
        <Button variant="link">Users</Button>
      </Link>
      <Link href="/admin/templates">
        <Button variant="link">Templates</Button>
      </Link>
    </Nav>
  );
}
