//smn/admin-page/frontend/src/components/TicketList.jsx add
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import moment from "moment";

const TicketList = ({ onDataChange }) => {
  const [tickets, setTickets] = useState([]);
  const [issueType, setIssueType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch tickets with location
  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const url = issueType
        ? `http://localhost:5000/api/admin/tickets/${issueType}`
        : `http://localhost:5000/api/admin/tickets`;
      const response = await axios.get(url);

      // Add formatted timestamps and location
      const ticketsWithTimestamps = response.data.map((ticket) => ({
        ...ticket,
        formattedTimestamp: moment(ticket.timestamp || new Date()).format("DD-MM-YYYY HH:mm:ss"),
      }));

      setTickets(ticketsWithTimestamps);
      if (onDataChange) {
        onDataChange();
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [issueType]);

  // Filter tickets based on search query
  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.ticket_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.issue_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.user_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.location?.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by location
  );

  // Get status color for UI
  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap gap-4">
          <select
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            className="block w-full sm:w-48 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="">All Issues</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
          </select>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets..."
            className="block w-full sm:w-64 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            onClick={fetchTickets}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="text-center p-6 text-gray-500">No tickets found</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th> {/* New column */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.ticket_id}>
                  <td className="px-6 py-4">{ticket.ticket_id}</td>
                  <td className="px-6 py-4">{ticket.issue_type}</td>
                  <td className="px-6 py-4">{ticket.user_id}</td>
                  <td className="px-6 py-4">{ticket.location}</td> {/* Display location */}
                  <td className="px-6 py-4">{ticket.formattedTimestamp}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

TicketList.propTypes = {
  onDataChange: PropTypes.func,
};

export default TicketList;



// // smn/admin-page/frontend/src/components/TicketList.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import PropTypes from "prop-types";
// import moment from "moment";

// const TicketList = ({ onDataChange }) => {
//   const [tickets, setTickets] = useState([]);
//   const [issueType, setIssueType] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");

//   const fetchTickets = async () => {
//     setIsLoading(true);
//     try {
//       const url = issueType
//         ? `http://localhost:5000/api/admin/tickets/${issueType}`
//         : `http://localhost:5000/api/admin/tickets`;
//       const response = await axios.get(url);

//       // Add formatted timestamps
//       const ticketsWithTimestamps = response.data.map((ticket) => ({
//         ...ticket,
//         formattedTimestamp: moment(ticket.timestamp || new Date()).format("DD-MM-YYYY HH:mm:ss"),
//       }));

//       setTickets(ticketsWithTimestamps);
//       if (onDataChange) {
//         onDataChange();
//       }
//     } catch (error) {
//       console.error("Error fetching tickets:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//   }, [issueType]);

//   const filteredTickets = tickets.filter(
//     (ticket) =>
//       ticket.ticket_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ticket.issue_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ticket.user_id?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Open":
//         return "bg-yellow-100 text-yellow-800";
//       case "In Progress":
//         return "bg-blue-100 text-blue-800";
//       case "Resolved":
//         return "bg-green-100 text-green-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md">
//       {/* Filters */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex flex-wrap gap-4">
//           <select
//             value={issueType}
//             onChange={(e) => setIssueType(e.target.value)}
//             className="block w-full sm:w-48 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
//           >
//             <option value="">All Issues</option>
//             <option value="Hardware">Hardware</option>
//             <option value="Software">Software</option>
//           </select>
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search tickets..."
//             className="block w-full sm:w-64 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
//           />
//           <button
//             onClick={fetchTickets}
//             className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
//           >
//             Refresh
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         {isLoading ? (
//           <div className="flex items-center justify-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
//           </div>
//         ) : filteredTickets.length === 0 ? (
//           <div className="text-center p-6 text-gray-500">No tickets found</div>
//         ) : (
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted On</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredTickets.map((ticket) => (
//                 <tr key={ticket.ticket_id}>
//                   <td className="px-6 py-4">{ticket.ticket_id}</td>
//                   <td className="px-6 py-4">{ticket.issue_type}</td>
//                   <td className="px-6 py-4">{ticket.user_id}</td>
//                   <td className="px-6 py-4">{ticket.formattedTimestamp}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
//                       {ticket.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// TicketList.propTypes = {
//   onDataChange: PropTypes.func,
// };

// export default TicketList;

