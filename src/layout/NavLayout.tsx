import { Outlet } from "react-router-dom";
import Navbar from "../shared/components/Navbar";


export default function AppLayout() {
  return (
    <>
      {/* Main scrollable content */}
      <Navbar />
      <main className="">
        <Outlet />
      </main>

      {/* Mobile-only bottom navigation */}
      
    </>
  );
}
