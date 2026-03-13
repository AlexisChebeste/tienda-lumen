import AdminSidebar from "@/components/admin/admin-sidebar";


export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full h-full">
      
      <AdminSidebar />

      <main className="flex-1 bg-gray-50 p-8 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}