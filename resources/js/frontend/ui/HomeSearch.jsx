import { Head, useForm } from "@inertiajs/react";

const HomeSearch = ({ results }) => {
    const { data, setData, post, processing, errors } = useForm({
        patient_id: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await post(route("home"));
    };

    return (
        <>
            <Head title="Dope Report" />

            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
                >
                    <h1 className="text-2xl font-semibold mb-6 text-center">
                        Check Fit/Unfit Status
                    </h1>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="patient_id"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Patient ID
                            </label>
                            <input
                                type="text"
                                id="patient_id"
                                value={data.patient_id}
                                onChange={(e) =>
                                    setData("patient_id", e.target.value)
                                }
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {errors.patient_id && (
                                <div className="text-red-600 text-sm mt-1">
                                    {errors.patient_id}
                                </div>
                            )}
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                disabled={processing}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </form>
                
                {results && results.length > 0 && (
                    <div className="bg-white rounded-lg mt-2 p-6 max-w-2xl w-full mx-auto">
                        <h1 className="text-2xl font-bold my-2 text-center">
                            Dope Test Report
                        </h1>
                        {results.map((result, index) => (
                            <div
                                key={index}
                                className="p-4 mb-4 bg-gray-100 rounded-md"
                            >
                                <h2 className="text-lg font-semibold mb-3">
                                    Patient Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <span className="font-semibold">
                                            Patient ID:
                                        </span>{" "}
                                        {result.patient_id}
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            Name:{" "}
                                        </span>{" "}
                                        {result.name}
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            Sex:{" "}
                                        </span>{" "}
                                        {result.dope.sex}
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            Date of Birth:
                                        </span>{" "}
                                        {result.dope.dob}
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            Collection Date:
                                        </span>{" "}
                                        {result.sample_collection_date}
                                    </div>
                                </div>

                                {/* Diagnostic Tests */}
                                <table className="w-full mt-4">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="">Test Name</th>
                                            <th className="">Result</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        <tr>
                                            <td className="py-2 px-4">
                                                Alcohol
                                            </td>
                                            <td className="py-2 px-4">
                                                {result.alcohol}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4">
                                                Benzodiazepines
                                            </td>
                                            <td className="py-2 px-4">
                                                {result.benzodiazepines}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4">
                                                Cannabinoids
                                            </td>
                                            <td className="py-2 px-4">
                                                {result.cannabinoids}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4">
                                                Amphetamine
                                            </td>
                                            <td className="py-2 px-4">
                                                {result.amphetamine}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4">
                                                Opiates
                                            </td>
                                            <td className="py-2 px-4">
                                                {result.opiates}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default HomeSearch;
