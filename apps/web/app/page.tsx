import LatestTemplates from '@/components/template/latest-templates';
import { BACKEND_URL } from '@/lib/constants';

export default async function Home() {
  const response = await fetch(`${BACKEND_URL}/templates/latest`);

  if (!response.ok) {
    console.error(`Failed to fetch templates: ${response.statusText}`);
  }

  const data = await response.json();

  return (
    <main>
      <LatestTemplates data={data} />
    </main>
  );
}
