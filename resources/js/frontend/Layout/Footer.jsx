import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "@inertiajs/react";
import logo from "@/assets/images/Logo/mch-logo.png";

const Footer = () => {
    const redirectToExternalLink = (url) => {
        window.open(url, "_blank");
    };

    return (
        <footer className="bg-blue-600 text-white py-8 text-center">
            <div className="container mx-auto px-4 flex flex-col justify-center items-center">
                {/* Logo */}
                <div className="mb-8 justify-center">
                    <img className="h-24" src={logo} alt="" />
                </div>

                {/* First Row */}
                <div className="flex justify-center mb-8">
                    <ul className="text-lg flex flex-wrap gap-6 justify-center">
                        <li>About Us</li>
                        <li>Blog</li>
                        <li>Jobs</li>
                        <li>Press</li>
                        <li>Accessibility</li>
                        <li>Partners</li>
                    </ul>
                </div>
                {/* Add more columns for other sections in the first row */}

                {/* Second Row */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center space-x-4">
                        <Link
                            onClick={() =>
                                redirectToExternalLink(
                                    "https://www.facebook.com"
                                )
                            }
                        >
                            <FaFacebook className="text-3xl cursor-pointer" />
                        </Link>
                        <Link
                            onClick={() =>
                                redirectToExternalLink(
                                    "https://www.twitter.com"
                                )
                            }
                        >
                            <FaTwitter className="text-3xl cursor-pointer" />
                        </Link>
                        <Link
                            onClick={() =>
                                redirectToExternalLink(
                                    "https://www.instagram.com"
                                )
                            }
                        >
                            <FaInstagram className="text-3xl cursor-pointer" />
                        </Link>
                        <Link
                            onClick={() =>
                                redirectToExternalLink(
                                    "https://www.linkedin.com"
                                )
                            }
                        >
                            <FaLinkedin className="text-3xl cursor-pointer" />
                        </Link>
                    </div>
                </div>
                {/* Add more columns for other sections in the second row */}

                {/* Third Row */}
                <div className="text-sm">
                    <p>
                        Developed by : Ari-Techs | ©2024 Created by JT All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
