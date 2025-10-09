import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { hasAnyRole, hasRole } from "../Utils/RoleCheck";

const SidebarMenu = () => {
    const { auth } = usePage().props;

    const [dropdownState, setDropdownState] = useState({
        preMedicalDropdown: false,
        pcrDropdown: false,
        antigenDropdown: false,
        dopeDropdown: false,
        molecularDropdown: false,
        molecularSampleDropdown: false,
        molecularResultDropdown: false,
        sampleDropdown: false,
        resultDropdown: false,
        reportApproveDropdown: false,
        dataPullDropdown: false,
        settings: false,
    });

    const toggleDropdown = (dropdown) => {
        setDropdownState((prevState) => ({
            ...prevState,
            [dropdown]: !prevState[dropdown],
        }));
    };

    return (
        <div>

            <div className="flex">
                <button
                    onClick={() => toggleDropdown("preMedicalDropdown")}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full text-lg rounded"
                >
                    {dropdownState.preMedicalDropdown
                        ? "Gamca Automation ▲"
                        : "Gamca Automation ▼"}
                </button>
            </div>
            {dropdownState.preMedicalDropdown && (
                <div className="flex flex-col gap-1">
                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                            <Link
                                href="/pre-medical/create"
                                className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                            >
                                Registration
                            </Link>
                        )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                        "general",
                    ]) && (
                            <Link
                                href="/pcr"
                                className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                            >
                                Manage Pcr
                            </Link>
                        )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                            <Link
                                href="/pcr/summary/report"
                                className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                            >
                                Date Wise Summary
                            </Link>
                        )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                            <Link
                                href="/pcr/summary/details"
                                className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                            >
                                Date Wise Summary Details
                            </Link>
                        )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                            <Link
                                href="/pcr/dues/details"
                                className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                            >
                                Date Wise Dues Details
                            </Link>
                        )}

                </div>
            )}

            <div className="flex">
                <button
                    onClick={() => toggleDropdown("pcrDropdown")}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full text-lg rounded"
                >
                    {dropdownState.pcrDropdown
                        ? "General PCR ▲"
                        : "General PCR ▼"}
                </button>
            </div>
            {dropdownState.pcrDropdown && (
                <div className="flex flex-col gap-1">
                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/pcr/create"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Registration
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                        "general",
                    ]) && (
                        <Link
                            href="/pcr"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Manage Pcr
                        </Link>
                    )}

                      {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/pcr/summary/report"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Date Wise Summary
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/pcr/summary/details"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Date Wise Summary Details
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/pcr/dues/details"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Date Wise Dues Details
                        </Link>
                    )}

                </div>
            )}

            <div className="flex">
                <button
                    onClick={() => toggleDropdown("antigenDropdown")}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full text-lg rounded"
                >
                    {dropdownState.antigenDropdown
                        ? "Rapid Antigen ▲"
                        : "Rapid Antigen ▼"}
                </button>
            </div>
            {dropdownState.antigenDropdown && (
                <div className="flex flex-col gap-1">
                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/antigen/create"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Registration
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                        "general",
                    ]) && (
                        <Link
                            href="/antigen"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Manage Antigen
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/antigen/summary/report"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Date Wise Summary
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/antigen/summary/details"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Date Wise Summary Details
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/antigen/dues/details"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Date Wise Dues Details
                        </Link>
                    )}

                </div>
            )}

            <div className="flex">
                <button
                    onClick={() => toggleDropdown("dopeDropdown")}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full text-lg rounded"
                >
                    {dropdownState.dopeDropdown ? "Dope Reg. ▲" : "Dope Reg. ▼"}
                </button>
            </div>
            {dropdownState.dopeDropdown && (
                <div className="flex flex-col gap-1">
                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/dope/create"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Registration
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                        "general",
                    ]) && (
                        <Link
                            href="/dope"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Manage Dope
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/dope-summary"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Date Wise Summary
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/summary-details"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Date Wise Summary Details
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/dues-details"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Date Wise Dues Details
                        </Link>
                    )}
                </div>
            )}

            {/* //Molecular start */}
            <div className="flex">
                <button
                    onClick={() => toggleDropdown("molecularDropdown")}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full text-lg rounded"
                >
                    {dropdownState.molecularDropdown
                        ? "Molecular Reg. ▲"
                        : "Molecular Reg. ▼"}
                </button>
            </div>
            {dropdownState.molecularDropdown && (
                <div className="flex flex-col gap-1">
                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/moleculars/create"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Registration
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                        "general",
                    ]) && (
                        <Link
                            href="/moleculars"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Manage Molecular
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/molecular/summary"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Date Wise Summary
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/molecular/summary/details"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Date Wise Summary Details
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/molecular/dues/details"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Date Wise Dues Details
                        </Link>
                    )}
                </div>
            )}

            {/* //end molecular */}

            {/* // start Molecular sample */}
            <div className="flex">
                <button
                    onClick={() => toggleDropdown("molecularSampleDropdown")}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full text-lg rounded"
                >
                    {dropdownState.molecularSampleDropdown
                        ? "Molecular Sample. ▲"
                        : "Molecular Sample. ▼"}
                </button>
            </div>
            {dropdownState.molecularSampleDropdown && (
                <div className="flex flex-col gap-1">
                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/samples/create"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Sample Collection(Molecular)
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/samples-receive"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Sample Receive(Molecular)
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                        "general",
                    ]) && (
                        <Link
                            href="/samples"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Manage Sample (Molecular)
                        </Link>
                    )}
                </div>
            )}

            {/* //sample molecular end  */}


            {/* // Molecular Result Start*/}
            <div className="flex">
                <button
                    onClick={() => toggleDropdown("molecularResultDropdown")}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full text-lg rounded"
                >
                    {dropdownState.molecularResultDropdown
                        ? "Molecular Result. ▲"
                        : "Molecular Result. ▼"}
                </button>
            </div>
            {dropdownState.molecularResultDropdown && (
                <div className="flex flex-col gap-1">
                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/samples"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Result Create(Molecular)
                        </Link>
                    )}


                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                        "general",
                    ]) && (
                        <Link
                            href="/results"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Manage Results (Molecular)
                        </Link>
                    )}
                </div>
            )}

            {/* //Molecular Result end  */}

            <div className="flex">
                <button
                    onClick={() => toggleDropdown("sampleDropdown")}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full text-lg rounded"
                >
                    {dropdownState.sampleDropdown
                        ? "Sample Collection (Dope) ▲"
                        : "Sample Collection (Dope) ▼"}
                </button>
            </div>
            {dropdownState.sampleDropdown && (
                <div className="flex flex-col gap-1">
                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/sample/create"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Sample Receive
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                        "general",
                    ]) && (
                        <Link
                            href="/sample"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Manage Sample
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/dope-summary"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Date Wise Summary
                        </Link>
                    )}
                </div>
            )}

            <div className="flex">
                <button
                    onClick={() => toggleDropdown("resultDropdown")}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full text-lg rounded"
                >
                    {dropdownState.resultDropdown
                        ? "Result Entry (Dope) ▲"
                        : "Result Entry (Dope) ▼"}
                </button>
            </div>
            {dropdownState.resultDropdown && (
                <div className="flex flex-col gap-1">
                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                    ]) && (
                        <Link
                            href="/result/create"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Result Input
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/result"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Manage Result
                        </Link>
                    )}

                    {hasAnyRole(auth.user, [
                        "super-admin",
                        "admin",
                        "sub-admin",
                        "user",
                    ]) && (
                        <Link
                            href="/dope-summary"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Date Wise Summary
                        </Link>
                    )}
                </div>
            )}

            <div className="flex">
                <button
                    onClick={() => toggleDropdown("reportApproveDropdown")}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full text-lg rounded"
                >
                    {dropdownState.reportApproveDropdown
                        ? "Approve Report(Dope) ▲"
                        : "Approve Report (Dope) ▼"}
                </button>
            </div>
            {dropdownState.reportApproveDropdown && (
                <div className="flex flex-col gap-1">
                    {hasAnyRole(auth.user, ["super-admin", "admin"]) && (
                        <Link
                            href="/update-report"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Approve Report
                        </Link>
                    )}
                </div>
            )}

            <div className="flex">
                <button
                    onClick={() => toggleDropdown("dataPullDropdown")}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full text-lg rounded"
                >
                    {dropdownState.dataPullDropdown
                        ? "Payroll System ▲"
                        : "Payroll System ▼"}
                </button>
            </div>
            {dropdownState.dataPullDropdown && (
                <div className="flex flex-col gap-1">
                    {hasAnyRole(auth.user, ["super-admin", "admin"]) && (
                        <Link
                            href="/attendance/sync/create"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Data Pull From Device
                        </Link>
                    )}

                    {hasAnyRole(auth.user, ["super-admin", "admin"]) && (
                        <Link
                            href="/employees"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Employee Manage
                        </Link>
                    )}

                    {hasAnyRole(auth.user, ["super-admin", "admin"]) && (
                        <Link
                            href="/attendance"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Attendance Report
                        </Link>
                    )}

                    {hasAnyRole(auth.user, ["super-admin", "admin"]) && (
                        <Link
                            href="/rosters"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Roster Manage
                        </Link>
                    )}

                    {hasAnyRole(auth.user, ["super-admin", "admin"]) && (
                        <Link
                            href="/assign-employee-roster"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Assign Roster
                        </Link>
                    )}

                    {hasAnyRole(auth.user, ["super-admin", "admin"]) && (
                        <Link
                            href="/holidays"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Holiday Manage
                        </Link>
                    )}

                    {hasAnyRole(auth.user, ["super-admin", "admin"]) && (
                        <Link
                            href="/leave"
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                        >
                            Leave Manage
                        </Link>
                    )}

                </div>
            )}

            <div className="flex">
                <button
                    onClick={() => toggleDropdown("settings")}
                    className="bg-blue-400 hover:bg-white font-bold btn w-full text-lg rounded"
                >
                    {dropdownState.settings ? "Settings ▲" : "Settings ▼"}
                </button>
            </div>
            {dropdownState.settings && (
                <div className="flex flex-col">
                    {hasAnyRole(auth.user, ["super-admin", "admin"]) && (
                        <Link
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                            href="/users"
                        >
                            Manage User
                        </Link>
                    )}
                </div>
            )}
            {dropdownState.settings && (
                <div className="flex flex-col">
                    {hasRole(auth.user, "super-admin") && (
                        <Link
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                            href="/roles"
                        >
                            Manage roles
                        </Link>
                    )}
                </div>
            )}

            {dropdownState.settings && (
                <div className="flex flex-col">
                    {hasRole(auth.user, "super-admin") && (
                        <Link
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                            href="/permissions"
                        >
                            Manage Permissions
                        </Link>
                    )}
                </div>
            )}
            {dropdownState.settings && (
                <div className="flex flex-col">
                    {hasAnyRole(auth.user, ["super-admin", "admin"]) && (
                        <Link
                            className="hover:bg-yellow-200 font-bold btn btn-blue rounded"
                            href="/references"
                        >
                            Manage Reference
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default SidebarMenu;
