import Link from 'next/link';
import { Container, Nav, Navbar } from 'react-bootstrap';
import SignInButton from './signin-bitton';

export default function AppBar() {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Link href="/" className="m-2">
          Home
        </Link>
        <Nav className="me-auto">
          <Link href="/dashboard">Dashboard</Link>
        </Nav>
        <Nav className="me-auto">
          <Link href="/profile">Profile</Link>
        </Nav>
        <Nav>
          <SignInButton />
        </Nav>
      </Container>
    </Navbar>
  );
}
