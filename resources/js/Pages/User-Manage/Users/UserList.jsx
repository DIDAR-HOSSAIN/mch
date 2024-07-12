import React from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const history = useHistory();

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`/api/users?page=${currentPage}`);
            setUsers(response.data.data);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`/api/users/${userId}`);
            setMessage('User deleted successfully.');
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
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
                        <Link className="btn btn-success" to="/users/create">Create New User</Link>
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
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1 + (currentPage - 1) * 10}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.roles.map((role) => (
                                    <label key={role} className="badge badge-success">{role}</label>
                                ))}
                            </td>
                            <td>
                                <Link className="btn btn-info" to={`/users/${user.id}`}>Show</Link>
                                <Link className="btn btn-primary" to={`/users/edit/${user.id}`}>Edit</Link>
                                <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                {[...Array(totalPages)].map((_, pageIndex) => (
                    <button
                        key={pageIndex}
                        className={`page-item ${currentPage === pageIndex + 1 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(pageIndex + 1)}
                    >
                        {pageIndex + 1}
                    </button>
                ))}
            </div>

            <p className="text-center text-primary"><small>Tutorial by ItSolutionStuff.com</small></p>
        </div>
    );
};

export default UserList;