import ModuleNav from "../../components/ModuleNav";
import { Outlet } from "react-router-dom";

function ModuleLayout() {
    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-3">
                        <ModuleNav />
                    </div>
                    <div className="col-md-9">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModuleLayout;