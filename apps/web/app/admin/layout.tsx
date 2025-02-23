import AdminNavBar from '@/components/admin/adminNav';

export default function AminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <AdminNavBar />
      {children}
    </main>
  );
}
