import { useGetModules } from "../../../services/module/useGetModules";
import ModuleCard from "./ModuleCard";
import AddModuleModal from "./AddModuleModal";
import { useState, useMemo } from "react";

function ModulesSection({ courseId }) {
    const [showAddModuleModal, setShowAddModuleModal] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const { data, isError, refetch } = useGetModules(courseId);
    const sortedModules = useMemo(() => {
        if (isError || !data) return [];
        return [...data].sort((a, b) => a.order - b.order)
    }, [data]);
    
    const handleShowAddModalButtonClick = () => {
        setSuccessMsg("");
        setShowAddModuleModal(true);
    }

    return (
        <>
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold mb-0">
                            Modules
                        </h5>
                        <button 
                            className="btn btn-primary btn-sm" 
                            type="button"
                            onClick={handleShowAddModalButtonClick}>
                            Add New Module
                        </button>
                    </div>

                    {/* MODULE LIST */}
                    {sortedModules.map((module) => (
                        <ModuleCard key={module.id}
                            title={module.moduleDto.title}
                            description={module.moduleDto.description}
                        />
                    ))}

                    <button className="btn btn-outline-info btn-sm m-1" type="button">
                        Edit
                    </button>
                    <button className="btn btn-outline-danger btn-sm" type="button">
                        Delete
                    </button>
                </div>
            </div>

            {showAddModuleModal && (<AddModuleModal
                courseId={courseId} 
                setShowAddModuleModal={setShowAddModuleModal}
                successMsg={successMsg}
                setSuccessMsg={setSuccessMsg}
                refetch={refetch} />)}
        </>
    );
}

export default ModulesSection;