import React, { useState } from "react";
import axiosApi from "./axios";

const Contact = () => {

       const [successMessage, setSuccessMessage] = useState("");

       const handleSubmit = async (event) => {
           event.preventDefault();
           const form = event.target;
           const name = form.name.value;
           const email = form.email.value;
           const phone = form.phone.value;
           const inquiry = form.inquiry.value;

           try {
               const response = await axiosApi.post("/contact", {
                   name,
                   email,
                   phone,
                   inquiry,
               });

               console.log(response.data); // You can handle the response as needed
               setSuccessMessage("Operation Successful!");
               form.reset(); // Reset the form fields
               setTimeout(() => {
                   setSuccessMessage("");
               }, 5000);
           } catch (error) {
               console.error("Error sending data:", error);
           }
       };


    return (
        <>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 place-items-center">
                {/* Left column */}
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl font-bold text-center text-blue-600/100 my-8">
                        Why Choose Our IT Services?
                    </h1>
                    <h2 className="text-3xl font-bold">Grow your business</h2>
                    <p className="mt-4">
                        Focus on scalling and expanding your business, while we
                        take care of your IT needs and network requirments.
                    </p>

                    <h2 className="text-3xl font-bold mt-4">
                        Streamline Processes
                    </h2>
                    <p className="mt-4">
                        Increase productivity and performance of your
                        organization when you have a dedicated IT support team
                        by your side.
                    </p>

                    <h2 className="text-3xl font-bold mt-4">
                        Empowering your people
                    </h2>
                    <p className="mt-4">
                        Allow your employees to do more and focus on their jobs,
                        without being held back by tech issues and concerns.
                    </p>
                </div>

                {/* Right column */}
                <div className="mt-4 lg:mt-0 w-full">
                    <h1 className="text-4xl font-bold text-center text-blue-600/100 my-8">
                        Contact Us
                    </h1>
                    {successMessage && (
                        <p className="text-green-600 text-center">{successMessage}</p>
                    )}
                    <form onSubmit={handleSubmit} className="bg-gray-100 p-6">
                        {/* Your form inputs go here */}

                        <input
                            className="w-full mb-4 p-2 rounded-md"
                            name="name"
                            type="text"
                            placeholder="Full Name"
                        />
                        <div className="flex flex-col lg:flex-row lg:gap-4">
                            <input
                                className="w-full lg:w-1/2 mb-4 p-2 rounded-md"
                                name="email"
                                type="email"
                                placeholder="Email"
                            />
                            <input
                                className="w-full lg:w-1/2 mb-4 p-2 rounded-md"
                                name="phone"
                                type="text"
                                placeholder="Phone Number"
                            />
                        </div>
                        <textarea
                            className="w-full mb-4 p-2 rounded-md"
                            rows="4"
                            name="inquiry"
                            placeholder="What is your inquiry about?"
                        ></textarea>
                        <button className="bg-blue-500 text-white py-2 px-4 w-full rounded-md hover:bg-blue-600">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Contact;
