import React, { useState } from "react";
import { Link } from "@inertiajs/react";

const SidebarMenu = () => {
    const [pcrDropdown, setPcrDropdown] = useState(false);
    const [settings, setSettings] = useState(false);
    const [report, setReport] = useState(false);

    const TogglePcrDropdown = () => {
        setPcrDropdown(!pcrDropdown);
    };

    const SettingsToggle = () => {
        setSettings(!settings);
    };
    const ReportToggle = () => {
        setReport(!report);
    };

    return (
        <div>
            <div className="flex">
                <button
                    onClick={TogglePcrDropdown}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full text-lg rounded"
                >
                    {pcrDropdown ? "General PCR ▲" : "General PCR ▼"}
                </button>
            </div>
            {pcrDropdown && (
                <div className="flex flex-col gap-1">
                    <Link
                        href="/pcr/create"
                        className="hover:bg-blue-500 hover:text-white font-bold btn btn-blue rounded"
                    >
                        Registration
                    </Link>
                    <Link
                        href="/pcr"
                        className="hover:bg-blue-500 hover:text-white font-bold btn btn-blue rounded"
                    >
                        Manage Pcr
                    </Link>
                    <Link
                        href="/summary"
                        className="hover:bg-blue-500 hover:text-white font-bold btn btn-blue rounded"
                    >
                        Date Wise Summary
                    </Link>
                </div>
            )}

            <div className="flex">
                <button
                    onClick={ReportToggle}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full rounded"
                >
                    {report ? "Dope ▲" : "Dope ▼"}
                </button>
            </div>
            {report && (
                <div className="flex flex-col gap-1">
                    <Link
                        href="/dope/create"
                        className="hover:bg-blue-500 hover:text-white font-bold btn btn-blue rounded"
                    >
                        Registration
                    </Link>
                    <Link
                        href="/dope"
                        className="hover:bg-blue-500 hover:text-white font-bold btn btn-blue rounded"
                    >
                        Manage Dope
                    </Link>
                    <Link
                        href="/dope-summary"
                        className="hover:bg-blue-500 hover:text-white font-bold btn btn-blue rounded"
                    >
                        Date Wise Summary
                    </Link>
                </div>
            )}

            <div className="flex">
                <button
                    onClick={SettingsToggle}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full rounded"
                >
                    {settings ? "Settings ▲" : "Settings ▼"}
                </button>
            </div>
            {settings && (
                <div className="flex flex-col">
                    <Link
                        className="hover:bg-blue-500 hover:text-white font-bold btn btn-blue rounded"
                        href="/registers"
                    >
                        User List
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SidebarMenu;
