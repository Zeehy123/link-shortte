import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function PageLayout() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900">
      <Sidebar />
      <div className="flex-2 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
