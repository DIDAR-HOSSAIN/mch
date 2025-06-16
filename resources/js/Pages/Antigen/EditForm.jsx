import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import NormalDatePicker from "@/Components/DatePicker";
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

const EditForm = ({ auth, antigen }) => {
    const initialData = {
        name: antigen.name || "",
        email: antigen.email || "",
        dob: antigen.dob ? new Date(antigen.dob) : null,
        age: antigen.age || "", // Initialize age field
        sex: antigen.sex || "",
        address: antigen.address || "",
        contact_no: antigen.contact_no || "",
        entry_date: antigen.entry_date ? new Date(antigen.entry_date) : null,
        police_station: antigen.police_station || "",
        district: antigen.district || "",
        reg_fee: antigen.reg_fee || "",
        discount: antigen.discount || "",
        paid: antigen.paid || "",
        due: antigen.due || "",
        total: antigen.total || "",
        discount_reference: antigen.discount_reference || "",
        contact_no_relation: antigen.contact_no_relation || "",
        sample_collected_by: antigen.sample_collected_by || "",
        hospital_name: antigen.hospital_name || "",
        payment_type: antigen.payment_type || "",
        account_head: antigen.account_head || "",
        nid: antigen.nid || "",
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
        patch(route("antigen.update", { antigen: antigen.id }), data);
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Update Rapid Antigen
                </h1>
            }
        >
            <Head title=" Update Rapid Antigen" />
            <div className="py-2">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                            <InputLabel htmlFor="dob" value="Date of Birth" />
                            <NormalDatePicker
                                selectedDate={data.dob}
                                handleDateChange={(date) =>
                                    handleDateChange(date, "dob")
                                }
                            />
                            <InputError message={errors.dob} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="age" value="Age" />
                            <TextInput
                                type="text"
                                className="w-full px-4 py-2"
                                label="Age"
                                name="age"
                                value={data.age}
                                onChange={(e) => setData("age", e.target.value)}
                            />
                            <InputError message={errors.age} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="sex" value="Sex" />

                            <select
                                type="text"
                                className="w-full px-4 py-2"
                                label="Sex"
                                name="sex"
                                value={data.sex}
                                onChange={(e) => setData("sex", e.target.value)}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>

                            <InputError message={errors.sex} className="mt-2" />
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
                            <InputLabel
                                htmlFor="entry_date"
                                value="Entry Date"
                            />

                            <NormalDatePicker
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
                                    setData("police_station", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.police_station}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="district" value="District" />

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
                            <InputLabel htmlFor="reg_fee" value="Reg Fee" />

                            <TextInput
                                type="text"
                                className="w-full px-4 py-2"
                                label="Reg Fee"
                                name="reg_fee"
                                value={data.reg_fee}
                                onChange={(e) =>
                                    setData("reg_fee", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.reg_fee}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="discount" value="Discount" />

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
                                    (data.discount >= data.reg_fee
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
                                onChange={(e) => setData("due", e.target.value)}
                            />

                            <InputError message={errors.due} className="mt-2" />
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
                                htmlFor="discount_reference"
                                value="Discount Reference"
                            />

                            <TextInput
                                type="text"
                                className="w-full px-4 py-2"
                                label="Discount Reference"
                                name="discount_reference"
                                value={data.discount_reference}
                                onChange={(e) =>
                                    setData(
                                        "discount_reference",
                                        e.target.value
                                    )
                                }
                            />

                            <InputError
                                message={errors.discount_reference}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="contact_no_relation"
                                value="Contact No Relation"
                            />

                            <TextInput
                                type="text"
                                className="w-full px-4 py-2"
                                label="Contact No Relation"
                                name="contact_no_relation"
                                value={data.contact_no_relation}
                                onChange={(e) =>
                                    setData(
                                        "contact_no_relation",
                                        e.target.value
                                    )
                                }
                            />

                            <InputError
                                message={errors.contact_no_relation}
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
                                htmlFor="hospital_name"
                                value="Hospital Name"
                            />

                            <select
                                type="text"
                                className="w-full px-4 py-2"
                                label="Hospital Name"
                                name="hospital_name"
                                value={data.hospital_name}
                                onChange={(e) =>
                                    setData("hospital_name", e.target.value)
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
                                <option value=" Ekushey Hospital">
                                    Ekushey Hospital
                                </option>
                                <option value=" CSCR Hospital">
                                    CSCR Hospital
                                </option>
                                <option value="Others">Others</option>
                            </select>

                            <InputError
                                message={errors.hospital_name}
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
