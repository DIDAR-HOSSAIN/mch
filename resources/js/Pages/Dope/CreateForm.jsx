import CustomDatePicker from "@/Components/DatePicker";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

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

const CreateForm = ({ auth, districts }) => {
    console.log('dope create form district',districts);
    const [dob, setDob] = useState(null);
    const [dobError, setDobError] = useState("");
    const [entryDate, setEntryDate] = useState(new Date());
    const [brtaFormDate, setBrtaFormDate] = useState(new Date());
    const [brtaSerialDate, setBrtaSerialDate] = useState(new Date());
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [error, setError] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        test_fee: "900",
        total: "",
        dob: null, // Ensure dob is initialized as null
        age: 0, // Initialize age with 0
        // other form fields...
    });

    console.log('Dope Create Form', data);

    // Function to handle district change
    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        const district = districts.find(
            (district) => district.id === parseInt(districtId)
        );
        setSelectedDistrict(district);
        setData("district", district ? district.name : ""); // Store the district name
    };

    //this function is only reg fee apply same below function is test_fee+reg_fee+online_fee

    // const handleRegFeeChange = (value) => {
    //     const testFee = parseFloat(value) || 0;
    //     const calculatedTotal = testFee - parseFloat(data.discount);
    //     setTotal(calculatedTotal);
    //     setData({ ...data, test_fee: testFee, total: calculatedTotal });
    // };

    // const handleDiscountChange = (value) => {
    //     const discount = parseFloat(value) || 0;
    //     const testFee = parseFloat(data.test_fee) || 0;
    //     const calculatedTotal = discount ? testFee - discount : testFee;
    //     const paid = parseFloat(data.paid) || 0;
    //     const calculatedDue = calculatedTotal - paid;

    //     setData((prevData) => ({
    //         ...prevData,
    //         discount: discount,
    //         total: calculatedTotal,
    //         due: calculatedDue,
    //     }));
    // };

    // const handlePaidChange = (value) => {
    //     const paid = parseFloat(value) || 0;
    //     const testFee = parseFloat(data.test_fee) || 0;
    //     const discount = parseFloat(data.discount) || 0;
    //     const calculatedTotal = discount ? testFee - discount : testFee;
    //     const calculatedDue = calculatedTotal - paid;

    //     setData((prevData) => ({
    //         ...prevData,
    //         paid: paid,
    //         due: calculatedDue,
    //         total: discount ? calculatedTotal : testFee,
    //     }));
    // };

    // const handleDueChange = (value) => {
    //     const due = parseFloat(value) || 0;
    //     const calculatedTotal = (parseFloat(total) || 0) + due;
    //     setTotal(calculatedTotal);
    //     setData("due", due);
    // };

    const handleRegFeeChange = (value) => {
        const testFee = parseFloat(value) || 0;
        const regFee = 300; // assuming reg_fee is always included
        const onlineFee = 300; // assuming online_fee is always included
        const calculatedTotal =
            testFee + regFee + onlineFee - parseFloat(data.discount);
        setTotal(calculatedTotal);
        setData({ ...data, test_fee: testFee, total: calculatedTotal });
    };

    const handleDiscountChange = (value) => {
        const discount = parseFloat(value) || 0;
        const testFee = parseFloat(data.test_fee) || 0;
        const regFee = 300; // assuming reg_fee is always included
        const onlineFee = 300; // assuming online_fee is always included
        const calculatedTotal = discount
            ? testFee + regFee + onlineFee - discount
            : testFee + regFee + onlineFee;
        const paid = parseFloat(data.paid) || 0;
        const calculatedDue = calculatedTotal - paid;

        setData((prevData) => ({
            ...prevData,
            discount: discount,
            total: calculatedTotal,
            due: calculatedDue,
        }));
    };

    const handlePaidChange = (value) => {
        const paid = parseFloat(value) || 0;
        const testFee = parseFloat(data.test_fee) || 0;
        const discount = parseFloat(data.discount) || 0;
        const regFee = 300; // assuming reg_fee is always included
        const onlineFee = 300; // assuming online_fee is always included
        const calculatedTotal = discount
            ? testFee + regFee + onlineFee - discount
            : testFee + regFee + onlineFee;
        const calculatedDue = calculatedTotal - paid;

        setData((prevData) => ({
            ...prevData,
            paid: paid,
            due: calculatedDue,
            total: discount ? calculatedTotal : testFee + regFee + onlineFee,
        }));
    };

    const handleDueChange = (value) => {
        const due = parseFloat(value) || 0;
        const testFee = parseFloat(data.test_fee) || 0;
        const regFee = 300; // assuming reg_fee is always included
        const onlineFee = 300; // assuming online_fee is always included
        const calculatedTotal =
            (parseFloat(total) || 0) + testFee + regFee + onlineFee + due;
        setTotal(calculatedTotal);
        setData("due", due);
    };


    const handleDobChange = (date) => {
        if (!date) {
            setDobError("Date of birth is required");
        } else {
            setDobError("");
        }
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

    const handleDateChange = (date, field) => {
        switch (field) {
            case "entry_date":
                setEntryDate(date);
                break;
            case "brta_form_date":
                setBrtaFormDate(date);
                break;
            case "brta_serial_date":
                setBrtaSerialDate(date);
                break;
            case "sample_collection_date":
                setSampleCollectionDate(date);
                break;
            default:
                break;
        }

        setData(field, date ? date.toISOString().split("T")[0] : null);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("dope.store"), {
            onSuccess: () => {
                const patientId = data.patient_id;
                Inertia.visit(route("dope-inv", { id: patientId }));
            },
            onError: (error) => {
                // Handle error response from backend
                setError(error.error);
                console.log(error);
                // Clear the error message after 10 seconds
                    setTimeout(() => {
                        setError(null);
                    }, 3000); // 10 seconds in milliseconds

            },
        });
    };

    return (
        <AdminDashboardLayout
            user={auth.user}
            header={
                <h1 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dope Registration
                </h1>
            }
        >
            <Head title="Dope Registration" />
            <div className="py-2">
                {error && <div className="text-red-500">{error}</div>}
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <InputLabel
                                htmlFor="brta_form_date"
                                value="BRTA Form Date"
                            />

                            <CustomDatePicker
                                selectedDate={brtaFormDate || new Date()}
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
                                id="brta_serial_no"
                                type="number"
                                name="brta_serial_no"
                                value={data.brta_serial_no || ""}
                                className="mt-1 block w-full"
                                autoComplete="brta_serial_no"
                                onChange={(e) =>
                                    setData("brta_serial_no", e.target.value)
                                }
                                required
                            />

                            {errors.brta_serial_no && (
                                <div className="error-message">
                                    {errors.brta_serial_no}
                                </div>
                            )}
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="brta_serial_date"
                                value="BRTA Serial Date"
                            />

                            <CustomDatePicker
                                selectedDate={brtaSerialDate || new Date()}
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
                                id="name"
                                name="name"
                                value={data.name.toUpperCase()}
                                className="mt-1 block w-full"
                                autoComplete="name"
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
                            <InputLabel
                                htmlFor="fathers_name"
                                value="Fathers Name"
                            />

                            <TextInput
                                id="fathers_name"
                                name="fathers_name"
                                value={data.fathers_name}
                                className="mt-1 block w-full"
                                autoComplete="fathers_name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData(
                                        "fathers_name",
                                        e.target.value.toUpperCase()
                                    )
                                }
                                required
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
                                id="mothers_name"
                                name="mothers_name"
                                value={data.mothers_name}
                                className="mt-1 block w-full"
                                autoComplete="mothers_name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData(
                                        "mothers_name",
                                        e.target.value.toUpperCase()
                                    )
                                }
                                required
                            />

                            <InputError
                                message={errors.mothers_name}
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

                        <div>
                            <InputLabel
                                htmlFor="contact_no"
                                value="Contact No"
                            />

                            <TextInput
                                id="contact_no"
                                type="number"
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
                            <InputLabel htmlFor="address" value="Address" />

                            <TextInput
                                id="address"
                                name="address"
                                value={data.address ? data.address : ""}
                                className="mt-1 block w-full"
                                autoComplete="address"
                                placeholder="House Name, Union/Pourashava"
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
                            <InputLabel htmlFor="dob" value="Date of Birth" />

                            <CustomDatePicker
                                selectedDate={dob || new Date()}
                                handleDateChange={(date) =>
                                    handleDobChange(date)
                                }
                                required:true
                            />
                            {dobError && (
                                <span className="error">{dobError}</span>
                            )}
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
                            <InputLabel htmlFor="test_fee" value="Test Fee" />

                            <TextInput
                                id="test_fee"
                                type="number"
                                name="test_fee"
                                value={data.test_fee || 900}
                                className="mt-1 block w-full"
                                autoComplete="test_fee"
                                onChange={(e) =>
                                    handleRegFeeChange(e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.test_fee}
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
                                    (data.discount >= data.test_fee
                                        ? "Discount cannot be greater than or equal to Test Fee"
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
                                htmlFor="Reference_name"
                                value="Reference Name"
                            />

                            <select
                                id="Reference_name"
                                name="Reference_name"
                                value={data.Reference_name}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData(
                                        "Reference_name",
                                        e.target.value.toUpperCase()
                                    )
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
                                message={errors.Reference_name}
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
                    </div>
                    <button
                        className="mx-auto block w-full mt-2 bg-blue-400  rounded text-xl py-2 hover:bg-blue-500 text-white font-semibold"
                        disabled={processing}
                    >
                        Register
                    </button>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default CreateForm;
