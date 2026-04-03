import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <div className="scanlines" />
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
