import React, { useState } from "react";
import { Link } from "@inertiajs/react";

const SidebarMenu = () => {
    const [pcrDropdown, setPcrDropdown] = useState(false);
    const [dopeDropdown, setDopeDropdown] = useState(false);
    const [sampleDropdown, setSampleDropdown] = useState(false);
    const [resultDropdown, setResultDropdown] = useState(false);
    const [reportApproveDropdown, setReportApproveDropdown] = useState(false);
    const [settings, setSettings] = useState(false);

    const TogglePcrDropdown = () => {
        setPcrDropdown(!pcrDropdown);
    };

    const ToggleDopeDropdown = () => {
        setDopeDropdown(!dopeDropdown);
    };

    const ToggleSampleDropdown = () => {
        setSampleDropdown(!sampleDropdown);
    };

    const ToggleResultDropdown = () => {
        setResultDropdown(!resultDropdown);
    };

    const ToggleReportApproveDropdown = () => {
        setReportApproveDropdown(!reportApproveDropdown);
    };

    const SettingsToggle = () => {
        setSettings(!settings);
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
                        className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                    >
                        Registration
                    </Link>
                    <Link
                        href="/pcr"
                        className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                    >
                        Manage Pcr
                    </Link>
                    <Link
                        href="/summary"
                        className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                    >
                        Date Wise Summary
                    </Link>
                </div>
            )}

            <div className="flex">
                <button
                    onClick={ToggleDopeDropdown}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full text-lg rounded"
                >
                    {dopeDropdown ? "Dope Reg. ▲" : "Dope Reg. ▼"}
                </button>
            </div>
            {dopeDropdown && (
                <div className="flex flex-col gap-1">
                    <Link
                        href="/dope/create"
                        className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                    >
                        Registration
                    </Link>
                    <Link
                        href="/dope"
                        className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                    >
                        Manage Dope
                    </Link>
                    <Link
                        href="/dope-summary"
                        className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                    >
                        Date Wise Summary
                    </Link>
                    <Link
                        href="/summary-details"
                        className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                    >
                        Date Wise Summary Details
                    </Link>
                    <Link
                        href="/dues-details"
                        className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                    >
                        Date Wise Dues Details
                    </Link>
                </div>
            )}

            <div className="flex">
                <button
                    onClick={ToggleSampleDropdown}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full text-lg rounded"
                >
                    {sampleDropdown
                        ? "Sample Collection (Dope) ▲"
                        : "Sample Collection (Dope) ▼"}
                </button>
            </div>
            {sampleDropdown && (
                <div className="flex flex-col gap-1">
                    <Link
                        href="/sample/create"
                        className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                    >
                        Sample Receive
                    </Link>
                    <Link
                        href="/sample"
                        className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                    >
                        Manage Sample
                    </Link>
                    <Link
                        href="/dope-summary"
                        className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                    >
                        Date Wise Summary
                    </Link>
                </div>
            )}

            <div className="flex">
                <button
                    onClick={ToggleResultDropdown}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full text-lg rounded"
                >
                    {resultDropdown
                        ? "Result Entry (Dope) ▲"
                        : "Result Entry (Dope) ▼"}
                </button>
            </div>
            {resultDropdown && (
                <div className="flex flex-col gap-1">
                    <Link
                        href="/result/create"
                        className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                    >
                        Result Input
                    </Link>
                    <Link
                        href="/result"
                        className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                    >
                        Manage Result
                    </Link>
                    <Link
                        href="/dope-summary"
                        className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                    >
                        Date Wise Summary
                    </Link>
                </div>
            )}

            <div className="flex">
                <button
                    onClick={ToggleReportApproveDropdown}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full text-lg rounded"
                >
                    {reportApproveDropdown
                        ? "Approve Report(Dope) ▲"
                        : "Approve Report (Dope) ▼"}
                </button>
            </div>
            {reportApproveDropdown && (
                <div className="flex flex-col gap-1">
                    <Link
                        href="/update-report"
                        className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                    >
                        Approve Report
                    </Link>
                </div>
            )}

            <div className="flex">
                <button
                    onClick={SettingsToggle}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full text-lg rounded"
                >
                    {settings ? "Settings ▲" : "Settings ▼"}
                </button>
            </div>
            {settings && (
                <div className="flex flex-col">
                    <Link
                        className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
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
