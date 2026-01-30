import AdminNavbar from "./components/AdminNavbar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <>
            <AdminNavbar />
            <Outlet />
        </>
    );
}

export default AdminLayout;