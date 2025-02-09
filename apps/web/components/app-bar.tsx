import Link from 'next/link';
import {
  Container,
  Nav,
  Navbar,
  NavbarCollapse,
  NavbarToggle,
} from 'react-bootstrap';
import SignInButton from './signin-bitton';

export default function AppBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link href="/" className="text-decoration-none fw-bold fs-5 me-5">
          <i className="bi bi-ui-checks-grid"> </i>Forms
        </Link>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse>
          <Nav className="me-auto">
            <Link href="/dashboard" className="m-1 text-decoration-none">
              Dashboard
            </Link>
            <Link href="/profile" className="m-1 text-decoration-none">
              Profile
            </Link>
          </Nav>
          <Nav>
            <SignInButton />
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}
