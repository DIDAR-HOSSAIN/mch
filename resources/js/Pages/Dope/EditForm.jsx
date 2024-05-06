import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import CustomDatePicker from "@/Components/DatePicker";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";

const calculateAge = (dob) => {
    if (!dob) return ""; // Return empty string if DOB is not set
    const currentDate = new Date();
    const birthDate = new Date(dob);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const birthMonth = birthDate.getMonth();
    if (
        currentMonth < birthMonth ||
        (currentMonth === birthMonth &&
            currentDate.getDate() < birthDate.getDate())
    ) {
        age--;
    }
    return age;
};

const EditForm = ({ auth, dope }) => {
    const initialData = {
        brta_form_date: dope.brta_form_date || "",
        brta_serial_no: dope.brta_serial_no || "",
        brta_serial_date: dope.brta_serial_date || "",
        name: dope.name || "",
        fathers_name: dope.fathers_name || "",
        mothers_name: dope.mothers_name || "",
        nid: dope.nid || "",
        passport_no: dope.passport_no || "",
        contact_no: dope.contact_no || "",
        address: dope.address || "",
        dob: dope.dob || "",
        age: dope.age || "", // Initialize age field
        sex: dope.sex || "",
        entry_date: dope.entry_date ? new Date(dope.entry_date) : null,
        police_station: dope.police_station || "",
        district: dope.district || "",
        email: dope.email || "",
        test_fee: dope.test_fee || "",
        discount: dope.discount || "",
        paid: dope.paid || "",
        due: dope.due || "",
        total: dope.total || "",
        test_name: dope.test_name || "",
        reference_name: dope.reference_name || "",
        payment_type: dope.payment_type || "",
        account_head: dope.account_head || "",
    };

    const { data, setData, patch, processing, errors } = useForm(initialData);

    useEffect(() => {
        // Calculate age when DOB changes
        setData((prevData) => ({
            ...prevData,
            age: calculateAge(prevData.dob),
        }));
    }, [data.dob]);

    const handleDateChange = (date, field) => {
        setData((prevData) => ({
            ...prevData,
            [field]: date,
            age: field === "dob" ? calculateAge(date) : prevData.age,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("dope.update", { dope: dope.id }), data);
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Update Dope
                </h1>
            }
        >
            <Head title="Update Dope" />
            <div className="py-2">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <InputLabel
                                htmlFor="brta_form_date"
                                value="BRTA Form Date"
                            />

                            <CustomDatePicker
                                selectedDate={data.brta_form_date}
                                handleDateChange={(date) =>
                                    handleDateChange(date, "brta_form_date")
                                }
                            />

                            <InputError
                                message={errors.brta_form_date}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="brta_serial_no"
                                value="BRTA Serial No"
                            />

                            <TextInput
                                type="text"
                                className="w-full px-4 py-2"
                                label="Name"
                                brta_serial_no="brta_serial_no"
                                value={data.brta_serial_no}
                                onChange={(e) =>
                                    setData("brta_serial_no", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.brta_serial_no}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="brta_serial_date"
                                value="BRTA Serial Date"
                            />

                            <CustomDatePicker
                                selectedDate={data.brta_serial_date}
                                handleDateChange={(date) =>
                                    handleDateChange(date, "brta_serial_date")
                                }
                            />

                            <InputError
                                message={errors.brta_serial_date}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                type="text"
                                className="w-full px-4 py-2"
                                label="Name"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="fathers_name"
                                value="Fathers Name"
                            />

                            <TextInput
                                type="text"
                                className="w-full px-4 py-2"
                                label="Name"
                                fathers_name="fathers_name"
                                value={data.fathers_name}
                                onChange={(e) =>
                                    setData("fathers_name", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.fathers_name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="mothers_name"
                                value="Mothers Name"
                            />

                            <TextInput
                                type="text"
                                className="w-full px-4 py-2"
                                label="mothers_name"
                                mothers_name="mothers_name"
                                value={data.mothers_name}
                                onChange={(e) =>
                                    setData("mothers_name", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.mothers_name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="nid" value="Nid No" />

                            <TextInput
                                type="text"
                                className="w-full px-4 py-2"
                                label="Nid No"
                                name="nid"
                                value={data.nid}
                                onChange={(e) => setData("nid", e.target.value)}
                            />

                            <InputError message={errors.nid} className="mt-2" />
                            </div>

                            <div>

                             <InputLabel
                                htmlFor="passport_no"
                                value="Passport No"
                            />

                            <TextInput
                                type="text"
                                className="w-full px-4 py-2"
                                label="Passport No"
                                name="passport_no"
                                value={data.passport_no}
                                onChange={(e) =>
                                    setData("passport_no", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.passport_no}
                                className="mt-2"
                            />
                        </div>

                        <div>
                                <InputLabel
                                    htmlFor="contact_no"
                                    value="Contact No"
                                />

                                <TextInput
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="Contact No"
                                    name="contact_no"
                                    value={data.contact_no}
                                    onChange={(e) =>
                                        setData("contact_no", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.contact_no}
                                    className="mt-2"
                                />
                            </div>

                             <div>
                                <InputLabel htmlFor="address" value="Address" />

                                <TextInput
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="Address"
                                    name="address"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.address}
                                    className="mt-2"
                                />
                            </div>

                             <div>
                                <InputLabel
                                    htmlFor="dob"
                                    value="Date of Birth"
                                />
                                <CustomDatePicker
                                    selectedDate={data.dob}
                                    handleDateChange={(date) =>
                                        handleDateChange(date, "dob")
                                    }
                                />
                                <InputError
                                    message={errors.dob}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="age" value="Age" />
                                <TextInput
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="Age"
                                    name="age"
                                    value={data.age}
                                    onChange={(e) =>
                                        setData("age", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.age}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="sex" value="Sex" />

                                <select
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="Sex"
                                    name="sex"
                                    value={data.sex}
                                    onChange={(e) =>
                                        setData("sex", e.target.value)
                                    }
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>

                                <InputError
                                    message={errors.sex}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="entry_date"
                                    value="Entry Date"
                                />

                                <CustomDatePicker
                                    selectedDate={data.entry_date}
                                    handleDateChange={(date) =>
                                        handleDateChange(date, "entry_date")
                                    }
                                />

                                <InputError
                                    message={errors.entry_date}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="sample_collection_date"
                                    value="Sample Collection Date"
                                />

                                <CustomDatePicker
                                    selectedDate={data.sample_collection_date}
                                    handleDateChange={(date) =>
                                        handleDateChange(date, "sample_collection_date")
                                    }
                                />

                                <InputError
                                    message={errors.sample_collection_date}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="police_station"
                                    value="Police Station"
                                />

                                <TextInput
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="Police Station"
                                    name="police_station"
                                    value={data.police_station}
                                    onChange={(e) =>
                                        setData(
                                            "police_station",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.police_station}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="district"
                                    value="District"
                                />

                                <TextInput
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="District"
                                    name="district"
                                    value={data.district}
                                    onChange={(e) =>
                                        setData("district", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.district}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="Email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                            
                            <div>
                                <InputLabel htmlFor="test_fee" value="Reg Fee" />

                                <TextInput
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="Reg Fee"
                                    name="test_fee"
                                    value={data.test_fee}
                                    onChange={(e) =>
                                        setData("test_fee", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.test_fee}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="discount"
                                    value="Discount"
                                />

                                <TextInput
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="Discount"
                                    name="discount"
                                    value={data.discount}
                                    onChange={(e) =>
                                        setData("discount", e.target.value)
                                    }
                                />
                                <InputError
                                    message={
                                        errors.discount ||
                                        (data.discount >= data.test_fee
                                            ? "Discount cannot be greater than or equal to Reg Fee"
                                            : "")
                                    }
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="paid" value="Paid" />

                                <TextInput
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="Paid"
                                    name="paid"
                                    value={data.paid}
                                    onChange={(e) =>
                                        setData("paid", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.paid}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="due" value="Due" />

                                <TextInput
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="Due"
                                    name="due"
                                    value={data.due}
                                    onChange={(e) =>
                                        setData("due", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.due}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="total" value="Total" />

                                <TextInput
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="Total"
                                    name="total"
                                    value={data.total}
                                    onChange={(e) =>
                                        setData("total", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.total}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="sample_collected_by"
                                    value="Sample Collected By"
                                />

                                <TextInput
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="Sample Collected By"
                                    name="sample_collected_by"
                                    value={data.sample_collected_by}
                                    onChange={(e) =>
                                        setData(
                                            "sample_collected_by",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.sample_collected_by}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="reference_name"
                                    value="Reference Name"
                                />

                                <select
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="Reference Name"
                                    name="reference_name"
                                    value={data.reference_name}
                                    onChange={(e) =>
                                        setData("reference_name", e.target.value)
                                    }
                                >
                                    <option value="">Select Hospital</option>
                                    <option value="Metropolitan Hospital">
                                        Metropolitan Hospital
                                    </option>
                                    <option value="Parkview Hospital">
                                        Parkview Hospital
                                    </option>
                                    <option value="Medical Center Hospital">
                                        Medical Center Hospital
                                    </option>
                                    <option value="Diabetic Hospital">
                                        Diabetic Hospital
                                    </option>
                                    <option value="Royal Hospital">
                                        Royal Hospital
                                    </option>
                                    <option value="Royal Hospital">
                                        Ekushey Hospital
                                    </option>
                                    <option value="Royal Hospital">
                                        CSCR Hospital
                                    </option>
                                    <option value="Royal Hospital">
                                        Others
                                    </option>
                                </select>

                                <InputError
                                    message={errors.reference_name}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="payment_type"
                                    value="Payment Type"
                                />

                                <select
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="Payment Type"
                                    name="payment_type"
                                    value={data.payment_type}
                                    onChange={(e) =>
                                        setData("payment_type", e.target.value)
                                    }
                                >
                                    <option value="Cash">Cash</option>
                                    <option value="Other">Other</option>
                                </select>

                                <InputError
                                    message={errors.payment_type}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="account_head"
                                    value="Account Head"
                                />

                                <TextInput
                                    type="text"
                                    className="w-full px-4 py-2"
                                    label="Account Head"
                                    name="account_head"
                                    value={data.account_head}
                                    onChange={(e) =>
                                        setData("account_head", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.account_head}
                                    className="mt-2"
                                />
                    </div>

                    </div>
                    <PrimaryButton
                        type="submit"
                        className="mx-auto block w-full mt-2"
                        disabled={processing}
                    >
                        {processing ? "Updating..." : "Update"}
                    </PrimaryButton>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default EditForm;
