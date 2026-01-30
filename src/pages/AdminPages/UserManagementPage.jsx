import { useState, useEffect } from "react";
import useBreakpoint from "../../hooks/useBreakpoint";
import { getUsers } from "../../services/user/getUsers";
import { useRegister } from "../../services/useRegister";
import { useUpdateUser } from "../../services/user/useUpdateUser";
import { useDeleteUser } from "../../services/user/useDeleteUser";
import { useSearchUser } from "../../services/user/useSearchUser";

function UserManagementPage() {
    const breakpoint = useBreakpoint();
    const register = useRegister();
    const update = useUpdateUser();
    const useDelete = useDeleteUser();

    const { data, isLoading, refetch } = getUsers();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    // Error/Success state
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Field states
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Update/Edit state
    const [updateUser, setUpdateUser] = useState({
        id: "",
        firstname: "",
        lastname: "",
    })

    const [deleteUser, setDeleteUser] = useState({
        id: ""
    });

    // SEARCH
    const [search, setSearch] = useState("");
    const searchUsers = useSearchUser(search);
    const [searchErr, setSearchErr] = useState("");

    const handleSearchInput = (event) => {
        const value = event.target.value;
        setSearch(value);

        if (!value.trim()) {
            setSearchErr("");
            return;
        }
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        if (!search.trim()) {
            setSearchErr("Please enter a search value");
            return;
        }
    }

    const handleFirstname = (event) => {
        setFirstname(event.target.value);
    }

    const handleLastname = (event) => {
        setLastname(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleAddSubmit = (event) => {
        event.preventDefault();

        const user = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }

        register.mutate(user, {
            onSuccess: () => {
                setErrorMessage("");
                setSuccessMessage("User added successfully");

                setFirstname("");
                setLastname("");
                setEmail("");
                setPassword("");

                refetch();
            },
            onError: (error) => {
                // Server down
                if (!error.response || error.code === "ERR_NETWORK") {
                    setErrorMessage("Server is not responding. Please try again later.");
                    return;
                }

                if (error.response.status === 409) {
                    setErrorMessage("Account already exists.");
                } else if (error.response.status === 400) {
                    setErrorMessage("Registration failed.");
                } else {
                    setErrorMessage("An expected error occured.")
                }
            }
        });
    }

    const handleEditSubmit = (event) => {
        event.preventDefault();

        const user = updateUser;

        if (!firstname && !lastname) {
            setErrorMessage("Update either firstname or lastname");
            return;
        }

        // updating only firstname or only updating lastname
        if (firstname && !lastname) {
            user.firstname = firstname;
            setUpdateUser(user);
        } else if (!firstname && lastname) {
            user.lastname = lastname;
            setUpdateUser(user);
        }

        update.mutate(updateUser, {
            onSuccess: () => {
                setErrorMessage("");
                setSuccessMessage("Update Successfull");

                setFirstname("");
                setLastname("");

                setUpdateUser({
                    id: "",
                    firstname: "",
                    lastname: ""
                });

                refetch();
            },
            onError: (error) => {
                // Server down
                if (!error.response || error.code === "ERR_NETWORK") {
                    setErrorMessage("Server is not responding. Please try again later.");
                    return;
                }

                if (error.response.status === 400) {
                    setErrorMessage(error.response.message);
                    return;
                }
            }
        });
    }

    const handleDeleteSubmit = () => {
        useDelete.mutate(deleteUser, {
            onSuccess: () => {
                setDeleteUser({
                    id: ""
                });

                setErrorMessage("");
                setSuccessMessage("Deletion Successfull");

                refetch();
            },
            onError: (error) => {
                // Server down
                if (!error.response || error.code === "ERR_NETWORK") {
                    setErrorMessage("Server is not responding. Please try again later.");
                    return;
                }

                if (error.response.status === 400) {
                    setErrorMessage(error.response.message);
                    return;
                }
            }
        });
    }

    const handleAddUser = () => {
        // Open your modal here
        setErrorMessage("");
        setSuccessMessage("");
        setShowAddModal(true);
    };

    const handleEditUser = (user) => {
        setErrorMessage("");
        setSuccessMessage("")
        setShowEditModal(true);

        const [firstname, lastname] = user.fullname.split(" ");
        setUpdateUser({
            id: user.id,
            firstname: firstname,
            lastname: lastname
        });
    }

    const handleDeleteUser = (user) => {
        setErrorMessage("");
        setSuccessMessage("");
        setShowDeleteModal(true);

        setDeleteUser({
            id: user.id
        })
    }

    const isSearching = search.trim().length > 0;

    const usersToRender = isSearching ? searchUsers?.data ?? [] : data ?? [];

    const showTable = () => {
        const bp = ["lg", "xl", "xxl"];

        if (bp.includes(breakpoint)) {
            return (<>
                {/* USERS TABLE */}
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Email</th>
                                    <th>Fullname</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {usersToRender?.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td>{user.email}</td>
                                        <td>{user.fullname}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <button 
                                                type="button" 
                                                className="btn btn-sm btn-outline-primary me-2" 
                                                onClick={() => handleEditUser(user)}>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button 
                                                type="button" 
                                                className="btn btn-sm btn-outline-danger" 
                                                onClick={() => handleDeleteUser(user)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </>);
        } else {
            return (
                <>
                    <div className="row g-4">

                        {usersToRender?.map((user) => (
                            <div key={user.id} className="col-12 col-sm-4 col-md-3">
                                <div className="card shadow-sm border-0 h-100">

                                    {/* Card Body */}
                                    <div className="card-body text-center">

                                        {/* Avatar */}
                                        <div 
                                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                                            style={{ width: "70px", height: "70px", fontSize: "1.5rem" }}
                                        >
                                            <i className="bi bi-person"></i>
                                        </div>

                                        {/* User Info */}
                                        <h5 className="fw-bold mb-1">{user.fullname}</h5>
                                        <p className="text-muted mb-1" style={{ fontSize: "0.9rem" }}>
                                            {user.email}
                                        </p>

                                        <p className="mb-1">
                                            <span className="badge bg-info text-dark">{user.role}</span>
                                        </p>

                                        {/* Action Icons */}
                                        <div className="d-flex justify-content-center gap-3">
                                            <button 
                                                type="button" 
                                                className="btn btn-sm btn-outline-primary me-2" 
                                                onClick={() => handleEditUser(user)}>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button 
                                                type="button" 
                                                className="btn btn-sm btn-outline-danger" 
                                                onClick={() => handleDeleteUser(user)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            );
        }
    }

    return (
        <>
            <div className="container-fluid py-4">
                <div className="container mb-4">

                    <form className="mb-3" onSubmit={handleSearchSubmit}>
                        <div className="row g-2">
                            
                            {/* Search Input */}
                            <div className="col-8 col-md-10">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-search"></i>
                                    </span>
                                    <input
                                        type="search"
                                        className="form-control"
                                        placeholder="Search users..."
                                        aria-label="Search"
                                        value={search}
                                        onChange={handleSearchInput}
                                    />
                                </div>
                            </div>

                            {/* Search Button */}
                            <div className="col-2 col-md-1">
                                <button 
                                    type="submit" 
                                    className="btn btn-outline-success w-100 d-flex align-items-center justify-content-center"
                                >
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>

                            {/* Add User Button */}
                            <div className="col-2 col-md-1">
                                <button
                                    type="button"
                                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                                    onClick={handleAddUser}
                                >
                                    <i className="bi bi-person-plus"></i>
                                </button>
                            </div>

                        </div>
                    </form>

                    {searchErr && (
                        <div className="alert alert-danger mt-3">
                            {searchErr}
                        </div>
                    )}

                    {isLoading ? <h1>Loading...</h1> : showTable()}
                </div>
            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <div className="modal d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New User</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowAddModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                {errorMessage && (
                                        <div className="alert alert-danger mt-3">
                                            {errorMessage}
                                        </div>
                                )}

                                {successMessage && (
                                    <div className="alert alert-success mt-3">
                                        {successMessage}
                                    </div>
                                )}
                               <form onSubmit={handleAddSubmit}>
                                    {/* First Name */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            name="firstName"
                                            placeholder="First Name"
                                            value={firstname}
                                            onChange={handleFirstname}
                                            required
                                        />
                                        <label htmlFor="firstName">First Name</label>
                                    </div>

                                    {/* Last Name */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            name="lastName"
                                            placeholder="Last Name"
                                            value={lastname}
                                            onChange={handleLastname}
                                            required
                                        />
                                        <label htmlFor="lastName">Last Name</label>
                                    </div>

                                    {/* Email */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={handleEmail}
                                            required
                                        />
                                        <label htmlFor="email">Email</label>
                                    </div>

                                    {/* Password */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={handlePassword}
                                            required
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="d-grid mb-3">
                                        <button type="submit" className="btn btn-primary btn-lg">
                                           Add user
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowAddModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showEditModal && (
                <div className="modal d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit User</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowEditModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                {errorMessage && (
                                        <div className="alert alert-danger mt-3">
                                            {errorMessage}
                                        </div>
                                )}

                                {successMessage && (
                                    <div className="alert alert-success mt-3">
                                        {successMessage}
                                    </div>
                                )}

                               <form onSubmit={handleEditSubmit}>
                                    {/* First Name */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            name="firstName"
                                            placeholder="Enter firstname"
                                            value={firstname}
                                            onChange={handleFirstname}
                                        />
                                        <label htmlFor="firstName">First Name</label>
                                    </div>

                                    {/* Last Name */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            name="lastName"
                                            placeholder="Enter lastname"
                                            value={lastname}
                                            onChange={handleLastname}
                                        />
                                        <label htmlFor="lastName">Last Name</label>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="d-grid mb-3">
                                        <button type="submit" className="btn btn-primary btn-lg">
                                           Update user
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete User Modal */}
            {showDeleteModal && (
                <div className="modal d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete User</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowDeleteModal(false)}
                                ></button>
                            </div>

                            {errorMessage && (
                                    <div className="alert alert-danger mt-3">
                                        {errorMessage}
                                    </div>
                            )}

                            {successMessage && (
                                <div className="alert alert-success mt-3">
                                    {successMessage}
                                </div>
                            )}

                            <div className="modal-body">
                                <p>Are you sure you want to delete this user?</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </button>
                                <button className="btn btn-danger" onClick={handleDeleteSubmit}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserManagementPage;