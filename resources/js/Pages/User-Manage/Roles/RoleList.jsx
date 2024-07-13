import React from 'react';

const RoleList = () => {
    const [message, setMessage] = useState('');
    const [permissions, setPermissions] = useState({});
    const [loading, setLoading] = useState(true);



    

    const fetchPermissions = async () => {
        try {
            const response = await axios.get('/api/permissions');
            setPermissions(response.data.permissions);
        } catch (error) {
            console.error('Error fetching permissions:', error);
        }
    };

    const deleteRole = async (id) => {
        if (window.confirm('Are you sure you want to delete this role?')) {
            try {
                await axios.delete(`/api/roles/${id}`);
                setRoles(roles.filter(role => role.id !== id));
                setMessage('Role deleted successfully.');
            } catch (error) {
                console.error('Error deleting role:', error);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 margin-tb">
                    <div className="pull-left">
                        <h2>Role Management</h2>
                    </div>
                    <div className="pull-right">
                        {permissions.create && (
                            <Link className="btn btn-success" to="/roles/create">Create New Role</Link>
                        )}
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
                        <th width="280px">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role, index) => (
                        <tr key={role.id}>
                            <td>{index + 1}</td>
                            <td>{role.name}</td>
                            <td>
                                <Link className="btn btn-info" to={`/roles/${role.id}`}>Show</Link>
                                {permissions.edit && (
                                    <Link className="btn btn-primary" to={`/roles/edit/${role.id}`}>Edit</Link>
                                )}
                                {permissions.delete && (
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteRole(role.id)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p className="text-center text-primary">
                <small>Tutorial by ItSolutionStuff.com</small>
            </p>
        </div>
    );
};

export default RoleList;