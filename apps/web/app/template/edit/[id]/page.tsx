import EditTemplateForm from '@/components/template/edit-template-form';

export default async function EditTemplate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <main>
      <EditTemplateForm id={id} />
    </main>
  );
}
