import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const ShowRole = () => {
    const [role, setRole] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchRoleData();
    }, []);

    const fetchRoleData = async () => {
        try {
            const response = await axios.get(`/api/roles/${id}`);
            setRole(response.data.role);
            setPermissions(response.data.permissions);
        } catch (error) {
            console.error('Error fetching role data:', error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 margin-tb">
                    <div className="pull-left">
                        <h2>Show Role</h2>
                    </div>
                    <div className="pull-right">
                        <Link className="btn btn-primary" to="/roles">Back</Link>
                    </div>
                </div>
            </div>

            {role && (
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                            <strong>Name:</strong>
                            {role.name}
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                            <strong>Permissions:</strong>
                            {permissions.length > 0 ? (
                                permissions.map((permission) => (
                                    <label key={permission.id} className="label label-success">
                                        {permission.name}
                                    </label>
                                ))
                            ) : (
                                <p>No permissions assigned.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowRole;