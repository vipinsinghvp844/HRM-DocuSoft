import { ArrowLeftCircle } from "lucide-react";
import { useState } from "react";
import { Nav } from "react-bootstrap";

const EmployeeFullDetails = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("Dashboard");



    const renderTabContent = () => {
        switch (activeTab) {
            case "Dashboard":
                return "here Dashboard content";
            case "Payslip":
                return "here payslip content";
            case "Attendance":
                return "here Attendance content";
            case "Leave":
                return "here Leave content";
            case "Profile":
                return "here Profile content";
            case "Settings":
                return "here Setting content";
            default:
                return <div>Select a tab to view content</div>;
        }
    };
    return (
        <div className="pt-4 px-2">
            <div className="flex md:flex-row items-center justify-between gap-2 mb-6">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeftCircle size={32} className="mr-2" />
                    <span className="hidden md:inline text-lg font-semibold">Back</span>
                </button>

                <h3 className="text-xl md:text-2xl font-semibold text-center flex-1">
                    Employee Detail
                </h3>
            </div>

            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
                <div className="bg-white shadow-md rounded-2xl w-full max-w-6xl p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">HR Portal</h1>
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                        >
                            {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Upload Payslips Section */}
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Upload Payslips
                            </h2>
                            <div className="w-full border border-dashed border-gray-300 rounded-lg p-10">
                                <div className="flex flex-col items-center justify-center text-gray-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-12 h-12 mb-3 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    <p className="text-gray-600">
                                        Drop files here <br /> or click to upload
                                    </p>
                                    <input type="file" className="d-none" id="UpPaySlip"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            alert(`file Uploaded Successfully Selected file: ${file.name}`);
                                        }
                                    }}
                                     accept=".png, .jpg, .jpeg, .jfif, .pdf" />
                                    <button className="mt-5 bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-700 transition"
                                        onClick={() => document.getElementById('UpPaySlip').click()}
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Employee View Section */}
                        <div className="flex flex-col">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Employee View
                            </h2>
                            <div className="flex bg-gray-100 rounded-xl overflow-hidden shadow-sm"
                                onSelect={(selectedKey) => setActiveTab(selectedKey)}
                            >
                                {/* Sidebar */}
                                {isSidebarOpen && (
                                    <Nav
                                        defaultActiveKey="Personal Info"
                                        className="w-40 bg-gray-100 border-r border-gray-200 p-4 space-y-3"
                                        onSelect={(selectedKey) => setActiveTab(selectedKey)}
                                    >
                                        <Nav.Link eventKey="Dashboard">Dashboard</Nav.Link>
                                        <Nav.Link eventKey="Payslip">Pay Slip</Nav.Link>
                                        <Nav.Link eventKey="Attendance">Attendance</Nav.Link>
                                        <Nav.Link eventKey="Leave">Leave</Nav.Link>
                                        <Nav.Link eventKey="Profile">Profile</Nav.Link>
                                        <Nav.Link eventKey="Settings">Settings</Nav.Link>
                                    </Nav>
                                )}


                                {/* Payslip Content */}
                                <div className="flex-1 p-6 bg-white rounded-r-xl">
                                    <div>{renderTabContent()}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EmployeeFullDetails;