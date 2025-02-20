import LatestTemplates from '@/components/template/latest-templates';
import { BACKEND_URL } from '@/lib/constants';
import axios from 'axios';

export default async function Home() {
  const response = await axios.get(`${BACKEND_URL}/templates/latest`);

  const data = response.data;

  return (
    <main>
      <LatestTemplates data={data} />
    </main>
  );
}
