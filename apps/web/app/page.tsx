import TagList from '@/components/tag-list';
import LatestTemplates from '@/components/template/latest-templates';
import TopTemplates from '@/components/top-templates';

export default async function Home() {
  return (
    <main>
      <LatestTemplates />
      <TopTemplates />
      <TagList />
    </main>
  );
}
