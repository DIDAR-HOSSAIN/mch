import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = ({ users }) => {
    const [userList, setUserList] = useState(users.data || []);
    const [message, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(users.current_page || 1);
    const [totalPages, setTotalPages] = useState(users.last_page || 1);

    console.log("user list", userList);

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`/api/users/${userId}`);
            setMessage("User deleted successfully.");
            fetchUsers(currentPage);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 margin-tb">
                    <div className="pull-left">
                        <h2>Users Management</h2>
                    </div>
                    <div className="pull-right">
                        <Link className="btn btn-success" href="/users/create">
                            Create New User
                        </Link>
                    </div>
                </div>
            </div>

            {message && (
                <div className="alert alert-success">
                    <p>{message}</p>
                </div>
            )}

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th width="280px">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1 + (currentPage - 1) * 5}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.roles}</td>
                            <td>
                                <Link
                                    className="btn btn-info"
                                    to={`/users/${user.id}`}
                                >
                                    Show
                                </Link>
                                <Link
                                    className="btn btn-primary"
                                    to={`/users/edit/${user.id}`}
                                >
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                {[...Array(totalPages)].map((_, pageIndex) => (
                    <button
                        key={pageIndex}
                        className={`page-item ${
                            currentPage === pageIndex + 1 ? "active" : ""
                        }`}
                        onClick={() => fetchUsers(pageIndex + 1)}
                    >
                        {pageIndex + 1}
                    </button>
                ))}
            </div>

            <p className="text-center text-primary">
                <small>Tutorial by ItSolutionStuff.com</small>
            </p>
        </div>
    );
};

export default UserList;
