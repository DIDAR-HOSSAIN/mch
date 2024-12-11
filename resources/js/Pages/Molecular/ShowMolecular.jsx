import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";

const ShowMolecular = ({ auth, molecularReg }) => {
    console.log(molecularReg);

    // Format Date function
    const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

    // If there's no molecularReg, show a message.
    if (!molecularReg) {
        return (
            <AdminDashboardLayout user={auth.user} header={<h2 className="text-lg font-bold">Molecular Details</h2>}>
                <div className="flex items-center justify-center h-64 text-gray-600 text-lg">
                    No data found for this patient.
                </div>
            </AdminDashboardLayout>
        );
    }

    return (
        <AdminDashboardLayout user={auth.user} header={<h2 className="text-lg font-bold">Molecular Details</h2>}>
            <div className="bg-white p-6 shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">Patient Details</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
                    <p><strong>Name:</strong> {molecularReg.name}</p>
                    <p><strong>Patient ID:</strong> {molecularReg.patient_id}</p>
                    <p><strong>Contact No:</strong> {molecularReg.contact_no}</p>
                    <p><strong>Age:</strong> {molecularReg.age}</p>
                    <p><strong>Gender:</strong> {molecularReg.gender}</p>
                    <p><strong>Registration Date:</strong> {formatDate(molecularReg.reg_date)}</p>
                    <p><strong>Due:</strong> {molecularReg.due}</p>
                </div>
            </div>

            <div className="mt-8 bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">Molecular Tests</h2>
                {molecularReg?.molecular_tests?.length > 0 ? (
                    <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
                            <tr>
                                <th className="border px-4 py-2">Test Name</th>
                                <th className="border px-4 py-2">Test Fee</th>
                                <th className="border px-4 py-2">Test Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {molecularReg.molecular_tests.map((test, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">{test.test_name}</td>
                                    <td className="border px-4 py-2">{test.test_fee}</td>
                                    <td className="border px-4 py-2">{formatDate(test.test_date)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-gray-600 mt-4">No molecular tests available.</div>
                )}
            </div>
        </AdminDashboardLayout>
    );
};

export default ShowMolecular;
