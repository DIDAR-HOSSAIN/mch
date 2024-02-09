import CustomDatePicker from "@/Components/DatePicker";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";
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

const CreateForm = ({ auth }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        reg_fee: 3500,
        total: 3500, // set the default total value here if needed
    });

    const [total, setTotal] = useState(data.reg_fee || 0);
    const [dob, setDob] = useState(null);
    const [firstDoseDate, setFirstDoseDate] = useState(null);
    const [secondDoseDate, setSecondDoseDate] = useState(null);
    const [boosterDoseDate, setBoosterDoseDate] = useState(null);

    const handleRegFeeChange = (value) => {
        const regFee = parseFloat(value) || 0;
        const calculatedTotal = regFee - parseFloat(data.discount);

        setTotal(calculatedTotal);
        setData({ ...data, reg_fee: regFee, total: calculatedTotal });
    };

    const handleDiscountChange = (value) => {
        const discount = value === "" ? "" : parseFloat(value) || 0;
        const regFee = parseFloat(data.reg_fee) || 0;

        let calculatedTotal = regFee - discount;
        calculatedTotal = Math.max(calculatedTotal, 0); // Ensure the total doesn't go below zero

        setTotal(calculatedTotal);
        setData((prevData) => ({
            ...prevData,
            discount,
            total: calculatedTotal,
        }));
    };

    const handlePaidChange = (value) => {
        const paid = parseFloat(value) || 0;
        const calculatedDue = (parseFloat(total) || 0) - paid;

        setTotal(total); // No change to total
        setData({ ...data, paid: paid, due: calculatedDue }); // Update paid and due in the form data
    };

    const handleDueChange = (value) => {
        const due = parseFloat(value) || 0;
        const calculatedTotal = (parseFloat(total) || 0) + due;
        setTotal(calculatedTotal);
        setData("due", due);
    };

    const handleDobChange = (date) => {
        // Update the state variable
        setDob(date);

        // Update the form data with the selected date
        const isoDate = date ? date.toISOString().split("T")[0] : null;
        setData("dob", isoDate);

        // Calculate and update the age
        const age = isoDate ? calculateAge(isoDate) : null;
        setData("age", age);
    };

    const handleDateChange = (date, field) => {
        switch (field) {
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

        post(route("pcr.store"));
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
                <form
                    onSubmit={submit}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
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
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="dob" value="Date of Birth" />

                        <CustomDatePicker
                            selectedDate={dob || new Date()}
                            handleDateChange={(date) => handleDobChange(date)}
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

                        <TextInput
                            id="sex"
                            name="sex"
                            value={data.sex}
                            className="mt-1 block w-full"
                            autoComplete="sex"
                            onChange={(e) => setData("sex", e.target.value)}
                            required
                        />

                        <InputError message={errors.sex} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="address" value="Address" />

                        <TextInput
                            id="address"
                            name="address"
                            value={data.address}
                            className="mt-1 block w-full"
                            autoComplete="address"
                            onChange={(e) => setData("address", e.target.value)}
                            required
                        />

                        <InputError message={errors.address} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="contact_no" value="Contact No" />

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
                        <InputLabel htmlFor="passport_no" value="Passport No" />

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
                            htmlFor="police_station"
                            value="Police Station"
                        />

                        <TextInput
                            id="police_station"
                            name="police_station"
                            value={data.police_station}
                            className="mt-1 block w-full"
                            autoComplete="police_station"
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
                            id="district"
                            name="district"
                            value={data.district}
                            className="mt-1 block w-full"
                            autoComplete="district"
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
                            id="reg_fee"
                            type="number"
                            name="reg_fee"
                            value={data.reg_fee || 3500}
                            className="mt-1 block w-full"
                            autoComplete="reg_fee"
                            onChange={(e) => handleRegFeeChange(e.target.value)}
                            required
                            readOnly
                        />

                        <InputError message={errors.reg_fee} className="mt-2" />
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
                            onChange={(e) => handlePaidChange(e.target.value)}
                        />

                        <InputError message={errors.paid} className="mt-2" />
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
                            onChange={(e) => handleDueChange(e.target.value)}
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
                        />

                        <InputError message={errors.total} className="mt-2" />
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
                                setData("discount_reference", e.target.value)
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
                                setData("contact_no_relation", e.target.value)
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
                                setData("sample_collected_by", e.target.value)
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

                        <TextInput
                            id="hospital_name"
                            name="hospital_name"
                            value={data.hospital_name}
                            className="mt-1 block w-full"
                            autoComplete="hospital_name"
                            onChange={(e) =>
                                setData("hospital_name", e.target.value)
                            }
                        />

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

                        <TextInput
                            id="payment_type"
                            name="payment_type"
                            value={data.payment_type}
                            className="mt-1 block w-full"
                            autoComplete="payment_type"
                            onChange={(e) =>
                                setData("payment_type", e.target.value)
                            }
                        />

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
                            value={data.account_head}
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

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route("login")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Already registered?
                        </Link>

                        <PrimaryButton className="ms-4" disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default CreateForm;
