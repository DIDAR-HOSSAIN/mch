import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import Swal from "sweetalert2";

const DataPull = ({ auth }) => {
    const [loading, setLoading] = useState(false);

    const pullF35 = () => {
        setLoading(true);
        Inertia.get("/attendance/sync-f35", {}, {
            onSuccess: (page) => {
                Swal.fire("Success", page.props.flash.success || "Attendance synced!", "success");
            },
            onError: (errors) => {
                Swal.fire("Error", errors || "Something went wrong!", "error");
            },
            onFinish: () => setLoading(false),
        });
    };

    return (
        <AdminDashboardLayout user={auth.user} header={<h1>Attendance Data Pull</h1>}>
            <div className="p-6">
                <button
                    onClick={pullF35}
                    disabled={loading}
                    className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
                >
                    {loading ? "Syncing..." : "Pull from F35"}
                </button>
            </div>
        </AdminDashboardLayout>
    );
};

export default DataPull;
