import { useState, useEffect } from "react";
import axios from "axios";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tickets from the backend when the component is mounted
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/tickets");
        setTickets(response.data.data); // Update the tickets state with the response
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError("Error fetching tickets");
        setLoading(false);
      }
    };

    fetchTickets(); // Call the function to fetch tickets
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">All Tickets</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Ticket ID</th>
            <th className="py-2 px-4 border-b">User ID</th>
            <th className="py-2 px-4 border-b">Issue Type</th>
            <th className="py-2 px-4 border-b">Comments</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id} className="border-b">
              <td className="py-2 px-4">{ticket.ticket_id}</td>
              <td className="py-2 px-4">{ticket.user_id}</td>
              <td className="py-2 px-4">{ticket.issue_type}</td>
              <td className="py-2 px-4">{ticket.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;
