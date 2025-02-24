import getTheme from '@/lib/getTheme';
import setTheme from '@/lib/setTheme';
import { Button } from 'react-bootstrap';

export default async function ThemeSwitch() {
  const theme = await getTheme();
  return (
    <form action={setTheme}>
      <Button
        variant="link"
        type="submit"
        size="sm"
        className="m-1 border-1 border-primary"
      >
        {theme === 'dark' ? (
          <i className="bi bi-brightness-high-fill"></i>
        ) : (
          <i className="bi bi-moon-fill"></i>
        )}
      </Button>
    </form>
  );
}
