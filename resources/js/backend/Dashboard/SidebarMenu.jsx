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
            <div className="flex items-center">
                <button onClick={TogglePcrDropdown} className="">
                    {pcrDropdown ? "General PCR ▲" : "General PCR ▼"}
                </button>
            </div>
            {pcrDropdown && (
                <div className="flex flex-col items-center">
                    <Link href="/pcr/create">Pcr Reg</Link>
                    <Link href="/pcr">PCR List</Link>
                </div>
            )}

            <div className="flex items-center">
                <button onClick={ReportToggle} className="">
                    {report ? "Report ▲" : "Report ▼"}
                </button>
            </div>
            {report && (
                <div className="flex flex-col items-center">
                    <Link href="/summary">Date Wise Summary</Link>
                </div>
            )}

            <div className="flex items-center">
                <button onClick={SettingsToggle} className="">
                    {settings ? "Settings ▲" : "Settings ▼"}
                </button>
            </div>
            {settings && (
                <div className="flex flex-col items-center">
                    <Link href="/registers">User List</Link>
                </div>
            )}
        </div>
    );
};

export default SidebarMenu;
