import { Suspense } from "react";

import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <Sidebar />
      </Suspense>

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}