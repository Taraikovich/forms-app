'use client';

import { Button } from 'react-bootstrap';

export default function Error() {
  return (
    <main className="text-center">
      <h1>Service is temporarily unavailable</h1>
      <p>Please wait 1-2 minutes and try again.</p>
      <Button onClick={() => window.location.reload()} size="lg">
        Refresh Page
      </Button>
    </main>
  );
}
