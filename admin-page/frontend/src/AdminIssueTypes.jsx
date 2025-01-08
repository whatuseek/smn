// Page to display distinct issue types
import { useEffect, useState } from "react";
import axios from "axios";

const AdminIssueTypes = () => {
    const [issueTypes, setIssueTypes] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchIssueTypes = async () => {
            try {
                const { data } = await axios.get("http://localhost:5001/api/admin/issue-types");
                setIssueTypes(data.data);
            } catch (err) {
                console.error("Error fetching issue types:", err);
                setError("Failed to fetch issue types");
            }
        };
        fetchIssueTypes();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            <header className="bg-blue-600 text-white w-full py-4 text-center font-bold text-2xl">
                Issue Types
            </header>

            <main className="w-full max-w-3xl mt-6 p-4">
                {error && (
                    <div className="text-red-600 text-center mb-4">{error}</div>
                )}
                <ul className="space-y-4">
                    {issueTypes.map((type, index) => (
                        <li
                            key={index}
                            className="bg-white px-6 py-4 rounded-lg shadow text-gray-700"
                        >
                            {type}
                        </li>
                    ))}
                </ul>
            </main>

            <footer className="absolute bottom-4 text-gray-500">
                &copy; 2025 Admin Panel
            </footer>
        </div>
    );
};

export default AdminIssueTypes;
