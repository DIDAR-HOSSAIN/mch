import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head, Link } from "@inertiajs/react";

const ShowMolecular = ({ auth, molecularReg }) => {
    console.log("show molecularReg", molecularReg);
    const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Molecular Details
                </h2>
            }
        >
            <Head title="Molecular Details" />

            <div className="py-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg rounded-lg p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-semibold text-white">
                            Patient Details
                        </h3>
                        <Link
                            href={route("moleculars.index")}
                            className="px-6 py-3 text-sm font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition duration-200"
                        >
                            Back to List
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                label: "Patient ID",
                                value: molecularReg.patient_id,
                            },
                            { label: "Name", value: molecularReg.name },
                            {
                                label: "Contact",
                                value: molecularReg.contact_no,
                            },
                            { label: "Age", value: molecularReg.age },
                            { label: "Gender", value: molecularReg.gender },
                            {
                                label: "Registration Date",
                                value: formatDate(molecularReg.reg_date),
                            },
                            { label: "Discount", value: molecularReg.discount },
                            { label: "Paid", value: molecularReg.paid },
                            { label: "Due", value: molecularReg.due },
                            { label: "Total", value: molecularReg.total },
                            {
                                label: "Net Payable",
                                value: molecularReg.net_payable,
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300"
                            >
                                <p className="font-bold text-gray-700">
                                    {item.label}:
                                </p>
                                <p className="text-lg text-gray-900">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800">
                            Remarks
                        </h3>
                        <p className="text-gray-600">
                            {molecularReg.remarks || "No remarks provided."}
                        </p>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default ShowMolecular;
