import CustomDatePicker from "@/Components/DatePicker";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AdminDashboardLayout from "@/backend/Dashboard/AdminDashboardLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";
import { useState } from "react";

const CreateForm = ({ auth }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
    });

    const handleDateChange = (date) => {
        setSelectedDate(date);
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
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
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
                                required
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="sex" value="Sex" />

                            <TextInput
                                id="sex"
                                name="sex"
                                value={data.sex}
                                className="mt-1 block w-full"
                                autoComplete="sex"
                                isFocused={true}
                                onChange={(e) => setData("sex", e.target.value)}
                                required
                            />

                            <InputError message={errors.sex} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="address" value="Address" />

                            <TextInput
                                id="address"
                                type="textArea"
                                name="address"
                                value={data.address}
                                className="mt-1 block w-full"
                                autoComplete="address"
                                isFocused={true}
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
                            <InputLabel htmlFor="test_type" value="Test type" />

                            <TextInput
                                id="test_type"
                                name="test_type"
                                value={data.test_type}
                                className="mt-1 block w-full"
                                autoComplete="test_type"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("test_type", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.test_type}
                                className="mt-2"
                            />
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
                                isFocused={true}
                                onChange={(e) =>
                                    setData("reg_fee", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.reg_fee}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="date" value="Date" />

                            <CustomDatePicker
                                selectedDate={selectedDate}
                                handleDateChange={handleDateChange}
                            />

                            {/* <TextInput
                        id="date"
                        type="date"
                        name="date"
                        value={data.date}
                        className="mt-1 block w-full"
                        autoComplete="date"
                        isFocused={true}
                        onChange={(e) => setData("date", e.target.value)}
                        required
                    />

                    <InputError message={errors.date} className="mt-2" /> */}
                        </div>

                        {/* <div>
                    <InputLabel htmlFor="user_name" value="User Name" />

                    <TextInput
                        id="user_name"
                        name="user_name"
                        value={data.user_name}
                        className="mt-1 block w-full"
                        autoComplete="user_name"
                        isFocused={true}
                        onChange={(e) => setData("user_name", e.target.value)}
                        required
                    />

                    <InputError message={errors.user_name} className="mt-2" />
                </div> */}

                        <div>
                            <InputLabel htmlFor="discount" value="Discount" />

                            <TextInput
                                id="discount"
                                type="number"
                                name="discount"
                                value={data.discount}
                                className="mt-1 block w-full"
                                autoComplete="discount"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("discount", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.discount}
                                className="mt-2"
                            />
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
                                isFocused={true}
                                onChange={(e) =>
                                    setData("total", e.target.value)
                                }
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
                                isFocused={true}
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
                            <InputLabel htmlFor="paid" value="Paid" />

                            <TextInput
                                id="paid"
                                type="number"
                                name="paid"
                                value={data.paid}
                                className="mt-1 block w-full"
                                autoComplete="paid"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("paid", e.target.value)
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
                                isFocused={true}
                                onChange={(e) => setData("due", e.target.value)}
                            />

                            <InputError message={errors.due} className="mt-2" />
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
                                isFocused={true}
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
                                htmlFor="police_station"
                                value="Police Station"
                            />

                            <TextInput
                                id="police_station"
                                name="police_station"
                                value={data.police_station}
                                className="mt-1 block w-full"
                                autoComplete="police_station"
                                isFocused={true}
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
                                isFocused={true}
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
                                isFocused={true}
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
                                htmlFor="vaccine_certificate_no"
                                value="Vaccine Certificate No"
                            />

                            <TextInput
                                id="vaccine_certificate_no"
                                name="vaccine_certificate_no"
                                value={data.vaccine_certificate_no}
                                className="mt-1 block w-full"
                                autoComplete="vaccine_certificate_no"
                                isFocused={true}
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
                                htmlFor="vaccine_name"
                                value="Vaccine Name"
                            />

                            <TextInput
                                id="vaccine_name"
                                name="vaccine_name"
                                value={data.vaccine_name}
                                className="mt-1 block w-full"
                                autoComplete="vaccine_name"
                                isFocused={true}
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
                                htmlFor="first_dose_date"
                                value="First Dose Date"
                            />

                            <TextInput
                                id="first_dose_date"
                                type="date"
                                name="first_dose_date"
                                value={data.first_dose_date}
                                className="mt-1 block w-full"
                                autoComplete="first_dose_date"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("first_dose_date", e.target.value)
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

                            <TextInput
                                id="second_dose_date"
                                type="date"
                                name="second_dose_date"
                                value={data.second_dose_date}
                                className="mt-1 block w-full"
                                autoComplete="second_dose_date"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("second_dose_date", e.target.value)
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

                            <TextInput
                                id="booster_dose_date"
                                type="date"
                                name="booster_dose_date"
                                value={data.booster_dose_date}
                                className="mt-1 block w-full"
                                autoComplete="booster_dose_date"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("booster_dose_date", e.target.value)
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
                                isFocused={true}
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
                                id="sample_collected_by"
                                name="sample_collected_by"
                                value={data.sample_collected_by}
                                className="mt-1 block w-full"
                                autoComplete="sample_collected_by"
                                isFocused={true}
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

                            <TextInput
                                id="hospital_name"
                                name="hospital_name"
                                value={data.hospital_name}
                                className="mt-1 block w-full"
                                autoComplete="hospital_name"
                                isFocused={true}
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
                            <InputLabel htmlFor="dob" value="Date of Birth" />

                            <TextInput
                                id="dob"
                                type="date"
                                name="dob"
                                value={data.dob}
                                className="mt-1 block w-full"
                                autoComplete="dob"
                                isFocused={true}
                                onChange={(e) => setData("dob", e.target.value)}
                                required
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
                                isFocused={true}
                                onChange={(e) => setData("age", e.target.value)}
                            />

                            <InputError message={errors.age} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="ticket_no" value="Ticket No" />

                            <TextInput
                                id="ticket_no"
                                name="ticket_no"
                                value={data.ticket_no}
                                className="mt-1 block w-full"
                                autoComplete="ticket_no"
                                isFocused={true}
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
                                isFocused={true}
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
                                isFocused={true}
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
                                isFocused={true}
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

                            <PrimaryButton
                                className="ms-4"
                                disabled={processing}
                            >
                                Register
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default CreateForm;
