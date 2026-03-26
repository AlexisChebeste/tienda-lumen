import ResumeDashboard from "@/components/admin/dashboard/resume-dashboard";
import { Suspense } from "react";


export default function DashboardPage() {

  return (
    <div className="flex-1 flex flex-col pb-6">
        <h1 className="font-serif text-3xl font-light">Dashboard</h1>
        <p className="text-gray-500 mt-2">Resumen general de tu tienda</p>

        <Suspense fallback={<div className="mt-6">Cargando resumen...</div>}>
          <ResumeDashboard />
        </Suspense>


    </div>
  );
}