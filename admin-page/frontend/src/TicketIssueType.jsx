// smn/admin-page/frontend/src/TicketIssueType.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const TicketIssueType = () => {
    const [issueTypes, setIssueTypes] = useState([]);
    const [selectedIssueType, setSelectedIssueType] = useState("");
    const [tickets, setTickets] = useState([]);

    // Fetch distinct issue types from MongoDB
    useEffect(() => {
        const fetchIssueTypes = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/admin/issue-types");
                setIssueTypes(response.data.data);
            } catch (error) {
                console.error("Error fetching issue types:", error);
            }
        };
        fetchIssueTypes();
    }, []);

    // Fetch tickets based on selected issue type
    useEffect(() => {
        if (selectedIssueType) {
            const fetchTickets = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/admin/tickets/${selectedIssueType}`);
                    setTickets(response.data.data);
                } catch (error) {
                    console.error("Error fetching tickets:", error);
                }
            };
            fetchTickets();
        }
    }, [selectedIssueType]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Tickets by Issue Type</h2>

            <select
                onChange={(e) => setSelectedIssueType(e.target.value)}
                value={selectedIssueType}
                className="block w-full mb-6 p-2 border rounded"
            >
                <option value="">Select Issue Type</option>
                {issueTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>

            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">Ticket ID</th>
                        <th className="py-2 px-4 border-b">User ID</th>
                        <th className="py-2 px-4 border-b">Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket._id} className="border-b">
                            <td className="py-2 px-4">{ticket.ticket_id}</td>
                            <td className="py-2 px-4">{ticket.user_id}</td>
                            <td className="py-2 px-4">{ticket.comments}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketIssueType;
