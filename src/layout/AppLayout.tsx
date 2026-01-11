import { Outlet } from "react-router-dom";
import Navbar from "../shared/components/BottomNav";



 export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-dvh">
      {/* Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </main>

      {/* Bottom navigation */}
      <div className="pb-16">
      <Navbar />
      </div>
    </div>
  );
}


