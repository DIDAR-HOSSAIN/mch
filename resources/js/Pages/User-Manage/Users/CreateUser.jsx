import { Link, useForm } from "@inertiajs/react";
import React from "react";

const CreateUser = ({ roles }) => {
    const { data, setData, post, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        roles: "",
    });

    // const roles = [
    //     { id: 1, name: "Admin" },
    //     { id: 2, name: "User" },
    //     // add more roles as needed
    // ];

    console.log("user create form", roles);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("users.store"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
                <h2 className="text-2xl font-bold">Create New User</h2>
                <Link
                    to="/users"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Back
                </Link>
            </div>

            {Object.keys(errors).length > 0 && (
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <strong className="font-bold">Whoops!</strong>
                    <span className="block sm:inline">
                        There were some problems with your input.
                    </span>
                    <ul>
                        {Object.keys(errors).map((key) => (
                            <li key={key} className="text-sm">
                                {errors[key]}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="roles"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Role:
                        </label>
                        <select
                            id="roles"
                            name="roles"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={data.roles}
                            onChange={(e) => setData("roles", e.target.value)}
                        >
                            <option value="">Select Role</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-4 flex justify-center">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </div>
            </form>

            <p className="text-center text-primary mt-4">
                <small>Tutorial by ItSolutionStuff.com</small>
            </p>
        </div>
    );
};

export default CreateUser;
