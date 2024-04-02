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

const EditForm = ({ auth, gpcr }) => {
    const initialData = {
        name: gpcr.name || "",
        email: gpcr.email || "",
        dob: gpcr.dob ? new Date(gpcr.dob) : null,
        age: gpcr.age || "", // Initialize age field
        sex: gpcr.sex || "",
        address: gpcr.address || "",
        contact_no: gpcr.contact_no || "",
        entry_date: gpcr.entry_date ? new Date(gpcr.entry_date) : null,
        police_station: gpcr.police_station || "",
        district: gpcr.district || "",
        reg_fee: gpcr.reg_fee || "",
        discount: gpcr.discount || "",
        paid: gpcr.paid || "",
        due: gpcr.due || "",
        total: gpcr.total || "",
        discount_reference: gpcr.discount_reference || "",
        vaccine_name: gpcr.vaccine_name || "",
        vaccine_certificate_no: gpcr.vaccine_certificate_no || "",
        first_dose_date: gpcr.first_dose_date
            ? new Date(gpcr.first_dose_date)
            : null,
        second_dose_date: gpcr.second_dose_date
            ? new Date(gpcr.second_dose_date)
            : null,
        booster_dose_date: gpcr.booster_dose_date
            ? new Date(gpcr.booster_dose_date)
            : null,
        contact_no_relation: gpcr.contact_no_relation || "",
        sample_collected_by: gpcr.sample_collected_by || "",
        hospital_name: gpcr.hospital_name || "",
        ticket_no: gpcr.ticket_no || "",
        payment_type: gpcr.payment_type || "",
        account_head: gpcr.account_head || "",
        nid: gpcr.nid || "",
        passport_no: gpcr.passport_no || "",
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
        patch(route("pcr.update", { pcr: gpcr.id }), data);
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Update PCR
                </h1>
            }
        >
            <Head title="Update PCR" />
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
                            <CustomDatePicker
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
                                htmlFor="vaccine_name"
                                value="Vaccine Name"
                            />

                            <TextInput
                                type="text"
                                className="w-full px-4 py-2"
                                label="Vaccine Name"
                                name="vaccine_name"
                                value={data.vaccine_name}
                                onChange={(e) =>
                                    setData("vaccine_name", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.vaccine_name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="vaccine_certificate_no"
                                value="Vaccine Certificate No"
                            />

                            <TextInput
                                type="text"
                                className="w-full px-4 py-2"
                                label="Vaccine Certificate No"
                                name="vaccine_certificate_no"
                                value={data.vaccine_certificate_no}
                                onChange={(e) =>
                                    setData(
                                        "vaccine_certificate_no",
                                        e.target.value
                                    )
                                }
                            />

                            <InputError
                                message={errors.vaccine_certificate_no}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="first_dose_date"
                                value="First Dose Date"
                            />

                            <CustomDatePicker
                                selectedDate={data.first_dose_date}
                                handleDateChange={(date) =>
                                    handleDateChange(date, "first_dose_date")
                                }
                            />

                            <InputError
                                message={errors.first_dose_date}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="second_dose_date"
                                value="Second Dose Date"
                            />

                            <CustomDatePicker
                                selectedDate={data.second_dose_date}
                                handleDateChange={(date) =>
                                    handleDateChange(date, "second_dose_date")
                                }
                            />

                            <InputError
                                message={errors.second_dose_date}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="booster_dose_date"
                                value="Booster Dose Date"
                            />

                            <CustomDatePicker
                                selectedDate={data.booster_dose_date}
                                handleDateChange={(date) =>
                                    handleDateChange(date, "booster_dose_date")
                                }
                            />

                            <InputError
                                message={errors.booster_dose_date}
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
                                <option value="Royal Hospital">
                                    Ekushey Hospital
                                </option>
                                <option value="Royal Hospital">
                                    CSCR Hospital
                                </option>
                                <option value="Royal Hospital">Others</option>
                            </select>

                            <InputError
                                message={errors.hospital_name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="ticket_no" value="Ticket No" />

                            <TextInput
                                type="text"
                                className="w-full px-4 py-2"
                                label="Ticket No"
                                name="ticket_no"
                                value={data.ticket_no}
                                onChange={(e) =>
                                    setData("ticket_no", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.ticket_no}
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
