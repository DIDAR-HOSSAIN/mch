import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";

const HomeSearch = ({ results }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        patient_id: "",
    });

    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "short", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-GB", options);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await post(route("home"), {
            onSuccess: () => reset(),
            onError: () => reset(),
        });
    };

    return (
        <>
            <Head title="Dope Report" />

            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-base sm:text-xl">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-sm sm:max-w-lg"
                >
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">
                        Check Fit/Unfit Status
                    </h1>
                    <div>
                        <label htmlFor="patient_id" className="block text-sm">
                            Patient ID
                        </label>
                        <input
                            type="text"
                            id="patient_id"
                            value={data.patient_id}
                            onChange={(e) =>
                                setData("patient_id", e.target.value)
                            }
                            required
                            className="h-10 sm:h-12 text-base sm:text-xl mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <InputError
                            message={errors.patient_id}
                            className="mt-2 text-red-600 text-sm sm:text-xl"
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                            disabled={processing}
                        >
                            Search
                        </button>
                    </div>
                </form>

                {results && results.length > 0 && (
                    <div className="bg-white rounded-lg mt-6 p-4 sm:p-6 w-full max-w-lg sm:max-w-2xl">
                        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
                            Dope Test Report
                        </h1>
                        {results.map((result, index) => (
                            <div
                                key={index}
                                className="p-3 sm:p-4 mb-4 bg-gray-100 rounded-md"
                            >
                                <div className="flex flex-col items-start sm:items-center justify-center p-2 sm:p-4">
                                    <div className="flex flex-col sm:flex-row sm:justify-between w-full text-sm sm:text-base">
                                        <span className="font-semibold">
                                            Patient ID:
                                        </span>
                                        <span> {result.patient_id}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between w-full text-sm sm:text-base">
                                        <span className="font-semibold">
                                            Name:
                                        </span>
                                        <span> {result.name}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between w-full text-sm sm:text-base">
                                        <span className="font-semibold">
                                            Sex:
                                        </span>
                                        <span> {result.dope.sex}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between w-full text-sm sm:text-base">
                                        <span className="font-semibold">
                                            Date of Birth:
                                        </span>
                                        <span>
                                            {formatDate(result.dope.dob)}
                                        </span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between w-full text-sm sm:text-base">
                                        <span className="font-semibold">
                                            Collection Date:
                                        </span>
                                        <span>
                                            {formatDate(
                                                result.sample_collection_date
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <table className="w-full mt-4 text-sm sm:text-base">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="py-2 px-3 sm:px-4">
                                                Test Name
                                            </th>
                                            <th className="py-2 px-3 sm:px-4">
                                                Result
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {result.alcohol && (
                                            <tr>
                                                <td className="py-2 px-3 sm:px-4">
                                                    Alcohol
                                                </td>
                                                <td className="py-2 px-3 sm:px-4">
                                                    {result.alcohol}
                                                </td>
                                            </tr>
                                        )}
                                        {result.benzodiazepines && (
                                            <tr>
                                                <td className="py-2 px-3 sm:px-4">
                                                    Benzodiazepines
                                                </td>
                                                <td className="py-2 px-3 sm:px-4">
                                                    {result.benzodiazepines}
                                                </td>
                                            </tr>
                                        )}
                                        {result.cannabinoids && (
                                            <tr>
                                                <td className="py-2 px-3 sm:px-4">
                                                    Cannabinoids
                                                </td>
                                                <td className="py-2 px-3 sm:px-4">
                                                    {result.cannabinoids}
                                                </td>
                                            </tr>
                                        )}
                                        {result.amphetamine && (
                                            <tr>
                                                <td className="py-2 px-3 sm:px-4">
                                                    Amphetamine
                                                </td>
                                                <td className="py-2 px-3 sm:px-4">
                                                    {result.amphetamine}
                                                </td>
                                            </tr>
                                        )}
                                        {result.opiates && (
                                            <tr>
                                                <td className="py-2 px-3 sm:px-4">
                                                    Opiates
                                                </td>
                                                <td className="py-2 px-3 sm:px-4">
                                                    {result.opiates}
                                                </td>
                                            </tr>
                                        )}
                                        {result.cocaine && (
                                            <tr>
                                                <td className="py-2 px-3 sm:px-4">
                                                    Cocaine
                                                </td>
                                                <td className="py-2 px-3 sm:px-4">
                                                    {result.cocaine}
                                                </td>
                                            </tr>
                                        )}
                                        {result.methamphetamine && (
                                            <tr>
                                                <td className="py-2 px-3 sm:px-4">
                                                    Methamphetamine
                                                </td>
                                                <td className="py-2 px-3 sm:px-4">
                                                    {result.methamphetamine}
                                                </td>
                                            </tr>
                                        )}
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
