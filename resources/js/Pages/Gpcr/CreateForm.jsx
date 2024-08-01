import CustomDatePicker from "@/Components/DatePicker";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const CreateForm = ({ auth, districts }) => {

    const [dob, setDob] = useState(null);
    const [entryDate, setEntryDate] = useState(new Date());
    const [firstDoseDate, setFirstDoseDate] = useState(null);
    const [secondDoseDate, setSecondDoseDate] = useState(null);
    const [boosterDoseDate, setBoosterDoseDate] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        contact_no: "",
        reg_fee: 3000,
        discount: 0,
        paid: 0,
        total: 0,
        due: 0,
        dob: null,
        age: 0,
        // other form fields...
    });

    const calculateAge = (dob) => {
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

     const handleDobChange = (date) => {
         // Update the state variable
         setDob(date);

         // Update the form data with the selected date
         const isoDate = date ? date.toISOString().split("T")[0] : null;
         setData((prevData) => ({
             ...prevData,
             dob: isoDate,
             age: isoDate ? calculateAge(isoDate) : 0,
         }));
     };

    // Function to handle district change
        const handleDistrictChange = (e) => {
            const districtId = e.target.value;
            const district = districts.find(
                (district) => district.id === parseInt(districtId)
            );
            setSelectedDistrict(district);
            setData("district", district ? district.name : ""); // Store the district name
        };

        const handleRegFeeChange = (value) => {
            const regFee = (value);
            const discount = (data.discount) || 0;
            const calculatedTotal = regFee - discount;
            const paid = (data.paid) || 0;
            const calculatedDue = calculatedTotal - paid;

            setData((prevData) => ({
                ...prevData,
                reg_fee: regFee,
                total: calculatedTotal,
                due: calculatedDue,
            }));
        };

        const handleDiscountChange = (value) => {
            const discount = (value);
            const regFee = (data.reg_fee) || 0;
            const calculatedTotal = regFee - discount;
            const paid = (data.paid) || 0;
            const calculatedDue = calculatedTotal - paid;

            setData((prevData) => ({
                ...prevData,
                discount: discount,
                total: calculatedTotal,
                due: calculatedDue,
            }));
        };

        const handlePaidChange = (value) => {
            const paid = (value);
            const regFee = (data.reg_fee) || 0;
            const discount = (data.discount) || 0;
            const calculatedTotal = regFee - discount;
            const calculatedDue = calculatedTotal - paid;

            setData((prevData) => ({
                ...prevData,
                paid: paid,
                due: calculatedDue,
                total: calculatedTotal,
            }));
        };

        const handleDueChange = (value) => {
            const due = (value) || 0;
            const total = (data.total) || 0;
            const calculatedTotal = total + due;
            setData((prevData) => ({
                ...prevData,
                due: due,
                total: calculatedTotal,
            }));
        };

    const handleDateChange = (date, field) => {
        switch (field) {
            case "entry_date":
                setEntryDate(date);
                break;
            case "first_dose_date":
                setFirstDoseDate(date);
                break;
            case "second_dose_date":
                setSecondDoseDate(date);
                break;
            case "booster_dose_date":
                setBoosterDoseDate(date);
                break;
            default:
                break;
        }

        setData(field, date ? date.toISOString().split("T")[0] : null);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("pcr.store"), {
            onSuccess: ({ data }) => {
                const patientId = data.patient_id;

                // Redirect to the invoice route with the patient_id from the response
                Inertia.visit(route("invoice", { id: patientId }));
            },
        });
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    General PCR
                </h1>
            }
        >
            <Head title="General PCR" />
            <div className="py-2">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name.toUpperCase()}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                autoCapitalize="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData(
                                        "name",
                                        e.target.value.toUpperCase()
                                    )
                                }
                                required
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
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
                                selectedDate={dob || new Date()}
                                handleDateChange={(date) =>
                                    handleDobChange(date)
                                }
                            />

                            <InputError message={errors.dob} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="age" value="Age" />
                            <TextInput
                                id="age"
                                name="age"
                                value={data.age}
                                className="mt-1 block w-full"
                                autoComplete="age"
                                onChange={(e) => setData("age", e.target.value)}
                                required
                            />
                            <InputError message={errors.age} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="sex" value="Sex" />

                            <select
                                id="sex"
                                name="sex"
                                value={data.sex}
                                className="mt-1 block w-full"
                                onChange={(e) => setData("sex", e.target.value)}
                                required
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
                                id="address"
                                name="address"
                                value={data.address ? data.address : ""}
                                className="mt-1 block w-full"
                                autoComplete="address"
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                required
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
                                id="contact_no"
                                type="text"
                                name="contact_no"
                                value={data.contact_no}
                                className="mt-1 block w-full"
                                autoComplete="contact_no"
                                onChange={(e) =>
                                    setData("contact_no", e.target.value)
                                }
                                required
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
                                selectedDate={entryDate || new Date()}
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
                            <InputLabel htmlFor="districts">
                                District:
                            </InputLabel>
                            <select
                                id="district"
                                onChange={handleDistrictChange}
                                value={
                                    selectedDistrict ? selectedDistrict.id : ""
                                }
                            >
                                <option value="">Select a District</option>
                                {districts.map((district) => (
                                    <option
                                        key={district.id}
                                        value={district.id}
                                    >
                                        {district.name}
                                    </option>
                                ))}
                            </select>

                            <InputError
                                message={errors.district}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="police_station">
                                Police Station:
                            </InputLabel>
                            <select
                                id="police_station"
                                onChange={(e) =>
                                    setData("police_station", e.target.value)
                                }
                                value={data.police_station}
                            >
                                <option value="">
                                    Select a Police Station
                                </option>
                                {selectedDistrict &&
                                    Array.isArray(selectedDistrict.thanas) &&
                                    selectedDistrict.thanas.map((thana) => (
                                        <option
                                            key={thana.id}
                                            value={thana.name}
                                        >
                                            {thana.name}{" "}
                                            {/* Render the thana name */}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div>
                            <InputLabel htmlFor="reg_fee" value="Reg Fee" />
                            <TextInput
                                id="reg_fee"
                                type="number"
                                name="reg_fee"
                                value={data.reg_fee}
                                className="mt-1 block w-full"
                                autoComplete="reg_fee"
                                onChange={(e) =>
                                    handleRegFeeChange(e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.reg_fee}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="discount" value="Discount" />

                            <TextInput
                                id="discount"
                                type="number"
                                name="discount"
                                value={data.discount}
                                className="mt-1 block w-full"
                                autoComplete="discount"
                                onChange={(e) =>
                                    handleDiscountChange(e.target.value)
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
                                id="paid"
                                type="number"
                                name="paid"
                                value={data.paid}
                                className="mt-1 block w-full"
                                autoComplete="paid"
                                onChange={(e) =>
                                    handlePaidChange(e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.paid}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="due" value="Due" />

                            <TextInput
                                id="due"
                                type="number"
                                name="due"
                                value={data.due}
                                className="mt-1 block w-full"
                                autoComplete="due"
                                onChange={(e) =>
                                    handleDueChange(e.target.value)
                                }
                                readOnly
                            />

                            <InputError message={errors.due} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="total" value="Total" />

                            <TextInput
                                id="total"
                                type="number"
                                name="total"
                                value={data.total}
                                className="mt-1 block w-full"
                                autoComplete="total"
                                onChange={(e) => setTotal(e.target.value)}
                                readOnly
                                required
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
                                id="discount_reference"
                                name="discount_reference"
                                value={data.discount_reference}
                                className="mt-1 block w-full"
                                autoComplete="discount_reference"
                                onChange={(e) =>
                                    setData(
                                        "discount_reference",
                                        e.target.value.toUpperCase()
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
                                id="vaccine_name"
                                name="vaccine_name"
                                value={data.vaccine_name}
                                className="mt-1 block w-full"
                                autoComplete="vaccine_name"
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
                                id="vaccine_certificate_no"
                                name="vaccine_certificate_no"
                                value={data.vaccine_certificate_no}
                                className="mt-1 block w-full"
                                autoComplete="vaccine_certificate_no"
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
                                selectedDate={firstDoseDate || new Date()}
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
                                selectedDate={secondDoseDate || new Date()}
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
                                selectedDate={boosterDoseDate || new Date()}
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
                                id="contact_no_relation"
                                name="contact_no_relation"
                                value={data.contact_no_relation}
                                className="mt-1 block w-full"
                                autoComplete="contact_no_relation"
                                onChange={(e) =>
                                    setData(
                                        "contact_no_relation",
                                        e.target.value.toUpperCase()
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
                                id="sample_collected_by"
                                name="sample_collected_by"
                                value={data.sample_collected_by}
                                className="mt-1 block w-full"
                                autoComplete="sample_collected_by"
                                onChange={(e) =>
                                    setData(
                                        "sample_collected_by",
                                        e.target.value.toUpperCase()
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
                                id="hospital_name"
                                name="hospital_name"
                                value={data.hospital_name}
                                className="mt-1 block w-full"
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
                                id="ticket_no"
                                name="ticket_no"
                                value={data.ticket_no}
                                className="mt-1 block w-full"
                                autoComplete="ticket_no"
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
                                id="payment_type"
                                name="payment_type"
                                value={data.payment_type}
                                className="mt-1 block w-full"
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
                                id="account_head"
                                name="account_head"
                                value={data.account_head || "Cash in hand"} // Set default value here
                                className="mt-1 block w-full"
                                autoComplete="account_head"
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
                                id="nid"
                                type="number"
                                name="nid"
                                value={data.nid}
                                className="mt-1 block w-full"
                                autoComplete="nid"
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
                                id="passport_no"
                                name="passport_no"
                                value={data.passport_no}
                                className="mt-1 block w-full"
                                autoComplete="passport_no"
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
                        className="mx-auto block w-full mt-2"
                        disabled={processing}
                    >
                        Register
                    </PrimaryButton>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default CreateForm;
