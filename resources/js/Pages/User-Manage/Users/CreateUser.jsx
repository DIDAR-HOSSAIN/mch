import React from 'react';

const CreateUser = () => {
      const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [roles, setRoles] = useState([]);
    const [allRoles, setAllRoles] = useState([]); // To store the list of roles from the server
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    // Fetch roles from the server on component mount
    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get('/api/roles'); // Adjust the endpoint as needed
            setAllRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users', {
                name,
                email,
                password,
                confirm_password: confirmPassword,
                roles,
            });
            history.push('/users');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(Object.values(error.response.data.errors).flat());
            }
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 margin-tb">
                    <div className="pull-left">
                        <h2>Create New User</h2>
                    </div>
                    <div className="pull-right">
                        <Link className="btn btn-primary" to="/users">Back</Link>
                    </div>
                </div>
            </div>

            {errors.length > 0 && (
                <div className="alert alert-danger">
                    <strong>Whoops!</strong> There were some problems with your input.<br /><br />
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                            <strong>Name:</strong>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                            <strong>Email:</strong>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                            <strong>Password:</strong>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                            <strong>Confirm Password:</strong>
                            <input
                                type="password"
                                name="confirm-password"
                                className="form-control"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                            <strong>Role:</strong>
                            <select
                                multiple
                                className="form-control"
                                value={roles}
                                onChange={(e) => setRoles([...e.target.selectedOptions].map(option => option.value))}
                            >
                                {allRoles.map(role => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>

            <p className="text-center text-primary">
                <small>Tutorial by ItSolutionStuff.com</small>
            </p>
        </div>
    );
};

export default CreateUser;