import Link from 'next/link';
import {
  Container,
  Nav,
  Navbar,
  NavbarCollapse,
  NavbarToggle,
} from 'react-bootstrap';
import SignInButton from './signin-bitton';
import { getSession } from '@/lib/session';
import ThemeSwitch from './theme-switch';
import SupportForm from './support-form';

export default async function AppBar() {
  const session = await getSession();

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
            {session?.user.role === 'ADMIN' && (
              <Link href="/admin" className="m-1 text-decoration-none">
                Administration
              </Link>
            )}
          </Nav>
          <Nav>
            <SupportForm />
          </Nav>
          <Nav>
            <SignInButton />
            <ThemeSwitch />
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}
