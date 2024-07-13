import axiosApi from '@/axios/axios';
import { Link, useForm } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';


const CreateRole = ({ permissions }) => {
    console.log('from create role',permissions);
    const [name, setName] = useState("");
    // const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    // const [errors, setErrors] = useState({});
    // const history = useHistory();

    const { data, setData, post, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        roles: "",
    });

    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchPermissions = async () => {
        try {
            const response = await axios.get("/api/permissions");
            setPermissions(response.data.permissions);
        } catch (error) {
            console.error("Error fetching permissions:", error);
        }
    };

    const handleCheckboxChange = (e) => {
        const value = parseInt(e.target.value);
        setSelectedPermissions((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((perm) => perm !== value)
                : [...prevSelected, value]
        );
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axiosApi.post("/api/roles", {
    //             name,
    //             permissions: selectedPermissions,
    //         });
    //         history.push("/roles");
    //     } catch (error) {
    //         if (error.response && error.response.data.errors) {
    //             setErrors(error.response.data.errors);
    //         } else {
    //             console.error("Error creating role:", error);
    //         }
    //     }
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("roles.store"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 margin-tb">
                    <div className="pull-left">
                        <h2>Create New Role</h2>
                    </div>
                    <div className="pull-right">
                        <Link className="btn btn-primary" to="/roles">
                            Back
                        </Link>
                    </div>
                </div>
            </div>

            {Object.keys(errors).length > 0 && (
                <div className="alert alert-danger">
                    <strong>Whoops!</strong> There were some problems with your
                    input.
                    <br />
                    <br />
                    <ul>
                        {Object.keys(errors).map((key) => (
                            <li key={key}>{errors[key]}</li>
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
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="form-control"
                                placeholder="Name"
                            />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                            <strong>Permission:</strong>
                            <br />
                            {permissions?.map((permission) => (
                                <label key={permission.id}>
                                    <input
                                        type="checkbox"
                                        value={permission.id}
                                        onChange={handleCheckboxChange}
                                        className="name"
                                    />
                                    {permission.name}
                                    <br />
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>

            <p className="text-center text-primary">
                <small>Tutorial by ItSolutionStuff.com</small>
            </p>
        </div>
    );
};

export default CreateRole;
