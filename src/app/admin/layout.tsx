import { Metadata } from "next";
import AdminSidebar from "./AdminSidebar";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "This is Admin Dashboard",
};
const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  return (
    <div className="overflow_height flex items-start justify-between overflow-hidden">
      <div className="overflow_height w-15 lg:w-1/5 bg-purple-600 text-white p-1 lg:p-5">
        <AdminSidebar />
      </div>
      <div className="overflow_height w-full lg:w-4/5 overflow-y-hidden">
        {children}
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
