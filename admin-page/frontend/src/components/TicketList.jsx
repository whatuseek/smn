// smn/admin-page/frontend/src/components/TicketList.jsx add
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FiTrash2, FiRefreshCw } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const TicketList = ({ onDataChange }) => {
  const [tickets, setTickets] = useState([]);
  const [issueType, setIssueType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [availableIssueTypes, setAvailableIssueTypes] = useState([]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Fetch available issue types from the backend
  const fetchIssueTypes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/issue-types');
      setAvailableIssueTypes(response.data);
    } catch (error) {
      console.error('Error fetching issue types:', error);
      showNotification('Failed to fetch issue types. Please try again.', 'error');
    }
  };

  // Show notification helper
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  // Fetch all tickets or filtered tickets based on issue type
  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const url = issueType
        ? `http://localhost:5000/api/admin/tickets/${issueType}`
        : 'http://localhost:5000/api/admin/tickets';
      const response = await axios.get(url);

      const ticketsWithTimestamps = response.data.map((ticket) => ({
        ...ticket,
        formattedTimestamp: moment(ticket.timestamp || new Date()).format('DD-MM-YYYY HH:mm:ss'),
      }));

      setTickets(ticketsWithTimestamps);
      if (onDataChange) {
        onDataChange();
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
      showNotification('Failed to fetch tickets. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchIssueTypes();
  }, [issueType]);

  // Delete ticket handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/tickets/${id}`);
      const updatedTickets = tickets.filter((ticket) => ticket._id !== id);
      setTickets(updatedTickets);
      showNotification('Ticket deleted successfully.', 'success');
    } catch (error) {
      console.error('Error deleting ticket:', error);
      showNotification('Failed to delete the ticket. Please try again.', 'error');
    }
  };

  // Change ticket status handler
  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      const updatedTickets = tickets.map((ticket) => {
        if (ticket.ticket_id === ticketId) {
          return { ...ticket, status: newStatus };
        }
        return ticket;
      });

      setTickets(updatedTickets);

      await axios.put(`http://localhost:5000/api/admin/tickets/${ticketId}/status`, {
        status: newStatus,
      });

      showNotification(`Status updated to ${newStatus}.`, 'success');
    } catch (error) {
      console.error('Error updating status:', error);
      showNotification('Failed to update status. Please try again.', 'error');
    }
  };

  // Filtering tickets based on search query
  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.ticket_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.issue_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.user_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.comments?.toLowerCase().includes(searchQuery.toLowerCase()) // Include comments in search
  );

  // Get status color for each ticket
  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm"
      >
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Issues</option>
            {availableIssueTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <button
            onClick={fetchTickets}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FiRefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </motion.div>

      {/* Tickets Table */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Ticket ID', 'Issue Type', 'User ID', 'Location', 'Status', 'Submitted', 'Comments', 'Actions'].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {filteredTickets.map((ticket) => (
                  <motion.tr
                    key={ticket._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    whileHover={{ scale: 1.01 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{ticket.ticket_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {ticket.issue_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{ticket.user_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{ticket.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={ticket.status}
                        onChange={(e) => handleStatusChange(ticket.ticket_id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ticket.formattedTimestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{ticket.comments || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(ticket._id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification.message && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

TicketList.propTypes = {
  onDataChange: PropTypes.func,
};

export default TicketList;






























// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import PropTypes from 'prop-types';
// import moment from 'moment';
// import { FiTrash2, FiRefreshCw } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion';

// const TicketList = ({ onDataChange }) => {
//   const [tickets, setTickets] = useState([]);
//   const [issueType, setIssueType] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [notification, setNotification] = useState({ message: '', type: '' });
//   const [availableIssueTypes, setAvailableIssueTypes] = useState([]);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { duration: 0.5 }
//     }
//   };

//   // Fetch available issue types from the backend
//   const fetchIssueTypes = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/admin/issue-types');
//       setAvailableIssueTypes(response.data);
//     } catch (error) {
//       console.error('Error fetching issue types:', error);
//       showNotification('Failed to fetch issue types. Please try again.', 'error');
//     }
//   };

//   // Show notification helper
//   const showNotification = (message, type) => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification({ message: '', type: '' }), 3000);
//   };

//   // Fetch all tickets or filtered tickets based on issue type
//   const fetchTickets = async () => {
//     setIsLoading(true);
//     try {
//       const url = issueType
//         ? `http://localhost:5000/api/admin/tickets/${issueType}`
//         : 'http://localhost:5000/api/admin/tickets';
//       const response = await axios.get(url);

//       const ticketsWithTimestamps = response.data.map((ticket) => ({
//         ...ticket,
//         formattedTimestamp: moment(ticket.timestamp || new Date()).format('DD-MM-YYYY HH:mm:ss'),
//       }));

//       setTickets(ticketsWithTimestamps);
//       if (onDataChange) {
//         onDataChange();
//       }
//     } catch (error) {
//       console.error('Error fetching tickets:', error);
//       showNotification('Failed to fetch tickets. Please try again.', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//     fetchIssueTypes();
//   }, [issueType]);

//   // Delete ticket handler
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/tickets/${id}`);
//       const updatedTickets = tickets.filter((ticket) => ticket._id !== id);
//       setTickets(updatedTickets);
//       showNotification('Ticket deleted successfully.', 'success');
//     } catch (error) {
//       console.error('Error deleting ticket:', error);
//       showNotification('Failed to delete the ticket. Please try again.', 'error');
//     }
//   };

//   // Change ticket status handler
//   const handleStatusChange = async (ticketId, newStatus) => {
//     try {
//       const updatedTickets = tickets.map((ticket) => {
//         if (ticket.ticket_id === ticketId) {
//           return { ...ticket, status: newStatus };
//         }
//         return ticket;
//       });

//       setTickets(updatedTickets);

//       await axios.put(`http://localhost:5000/api/admin/tickets/${ticketId}/status`, {
//         status: newStatus,
//       });

//       showNotification(`Status updated to ${newStatus}.`, 'success');
//     } catch (error) {
//       console.error('Error updating status:', error);
//       showNotification('Failed to update status. Please try again.', 'error');
//     }
//   };

//   // Filtering tickets based on search query
//   const filteredTickets = tickets.filter(
//     (ticket) =>
//       ticket.ticket_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ticket.issue_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ticket.user_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ticket.location?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Get status color for each ticket
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Open':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'In Progress':
//         return 'bg-blue-100 text-blue-800';
//       case 'Resolved':
//         return 'bg-green-100 text-green-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Search and Filter Section */}
//       <motion.div 
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm"
//       >
//         <div className="w-full md:w-1/3">
//           <input
//             type="text"
//             placeholder="Search tickets..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           />
//         </div>
//         <div className="flex gap-2">
//           <select
//             value={issueType}
//             onChange={(e) => setIssueType(e.target.value)}
//             className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">All Issues</option>
//             {availableIssueTypes.map((type) => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>
//           <button
//             onClick={fetchTickets}
//             className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             <FiRefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
//           </button>
//         </div>
//       </motion.div>

//       {/* Tickets Table */}
//       <motion.div 
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="bg-white rounded-lg shadow-sm overflow-hidden"
//       >
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 {['Ticket ID', 'Issue Type', 'User ID', 'Location', 'Status', 'Submitted', 'Actions'].map((header) => (
//                   <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     {header}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               <AnimatePresence>
//                 {filteredTickets.map((ticket) => (
//                   <motion.tr
//                     key={ticket._id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     whileHover={{ scale: 1.01 }}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">{ticket.ticket_id}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
//                         {ticket.issue_type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">{ticket.user_id}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{ticket.location}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <select
//                         value={ticket.status}
//                         onChange={(e) => handleStatusChange(ticket.ticket_id, e.target.value)}
//                         className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}
//                       >
//                         <option value="Open">Open</option>
//                         <option value="In Progress">In Progress</option>
//                         <option value="Resolved">Resolved</option>
//                       </select>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {ticket.formattedTimestamp}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <button
//                         onClick={() => handleDelete(ticket._id)}
//                         className="text-red-600 hover:text-red-900 transition-colors"
//                       >
//                         <FiTrash2 className="w-5 h-5" />
//                       </button>
//                     </td>
//                   </motion.tr>
//                 ))}
//               </AnimatePresence>
//             </tbody>
//           </table>
//         </div>
//       </motion.div>

//       {/* Notification Toast */}
//       <AnimatePresence>
//         {notification.message && (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//             className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg ${
//               notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
//             } text-white`}
//           >
//             {notification.message}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// TicketList.propTypes = {
//   onDataChange: PropTypes.func,
// };

// export default TicketList;











// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import PropTypes from 'prop-types';
// import moment from 'moment';
// import { FiTrash2 } from 'react-icons/fi';

// const TicketList = ({ onDataChange }) => {
//   const [tickets, setTickets] = useState([]);
//   const [issueType, setIssueType] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [notification, setNotification] = useState({ message: '', type: '' });
//   const [availableIssueTypes, setAvailableIssueTypes] = useState([]);

//   // Fetch available issue types from the backend
//   const fetchIssueTypes = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/admin/issue-types');
//       setAvailableIssueTypes(response.data);
//     } catch (error) {
//       console.error('Error fetching issue types:', error);
//       setNotification({ message: 'Failed to fetch issue types. Please try again.', type: 'error' });
//     }
//   };

//   // Fetch all tickets or filtered tickets based on issue type
//   const fetchTickets = async () => {
//     setIsLoading(true);
//     try {
//       const url = issueType
//         ? `http://localhost:5000/api/admin/tickets/${issueType}`
//         : 'http://localhost:5000/api/admin/tickets';
//       const response = await axios.get(url);

//       const ticketsWithTimestamps = response.data.map((ticket) => ({
//         ...ticket,
//         formattedTimestamp: moment(ticket.timestamp || new Date()).format('DD-MM-YYYY HH:mm:ss'),
//       }));

//       setTickets(ticketsWithTimestamps);
//       if (onDataChange) {
//         onDataChange();
//       }
//     } catch (error) {
//       console.error('Error fetching tickets:', error);
//       setNotification({ message: 'Failed to fetch tickets. Please try again.', type: 'error' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//     fetchIssueTypes();
//   }, [issueType]);

//   // Delete ticket handler
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/tickets/${id}`);
//       const updatedTickets = tickets.filter((ticket) => ticket._id !== id);
//       setTickets(updatedTickets);
//       setNotification({ message: 'Ticket deleted successfully.', type: 'success' });
//     } catch (error) {
//       console.error('Error deleting ticket:', error);
//       setNotification({ message: 'Failed to delete the ticket. Please try again.', type: 'error' });
//     }
//   };

// // Change ticket status handler
// const handleStatusChange = async (ticketId, newStatus) => {
//   try {
//     const updatedTickets = tickets.map((ticket) => {
//       if (ticket.ticket_id === ticketId) {
//         return { ...ticket, status: newStatus };
//       }
//       return ticket;
//     });

//     setTickets(updatedTickets);

//     // Send the updated status to the backend
//     await axios.put(`http://localhost:5000/api/admin/tickets/${ticketId}/status`, {
//       status: newStatus,
//     });

//     setNotification({ message: `Status updated to ${newStatus}.`, type: 'success' });
//   } catch (error) {
//     console.error('Error updating status:', error);
//     setNotification({ message: 'Failed to update status. Please try again.', type: 'error' });
//   }
// };
  

//   // Filtering tickets based on search query
//   const filteredTickets = tickets.filter(
//     (ticket) =>
//       ticket.ticket_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ticket.issue_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ticket.user_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ticket.location?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Get status color for each ticket
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Open':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'In Progress':
//         return 'bg-blue-100 text-blue-800';
//       case 'Resolved':
//         return 'bg-green-100 text-green-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md">
//       {/* Notification UI */}
//       {notification.message && (
//         <div
//           className={`p-4 mb-4 text-sm rounded-lg ${
//             notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//           }`}
//         >
//           {notification.message}
//         </div>
//       )}

//       {/* Filters */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex flex-wrap gap-4">
//           {/* Dynamic Issue Type Dropdown */}
//           <select
//             value={issueType}
//             onChange={(e) => setIssueType(e.target.value)}
//             className="block w-full sm:w-48 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
//           >
//             <option value="">All Issues</option>
//             {/* Dynamically render issue types from MongoDB */}
//             {availableIssueTypes.map((type) => (
//               <option key={type} value={type}>
//                 {type.toUpperCase()}
//               </option>
//             ))}
//           </select>

//           {/* Search Input */}
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search tickets..."
//             className="block w-full sm:w-64 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
//           />

//           {/* Refresh Button */}
//           <button
//             onClick={fetchTickets}
//             className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
//           >
//             Refresh
//           </button>

//           {/* Reset Button */}
//           <button
//             onClick={() => {
//               setSearchQuery('');
//               setIssueType('');
//             }}
//             className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
//           >
//             Reset Filters
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
//                 {/* Table headers */}
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket ID</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue Type</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted On</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {/* Map tickets to table rows */}
//               {filteredTickets.map((ticket) => (
//                 <tr key={ticket.ticket_id}>
//                   <td className="px-4 py-4">{ticket.ticket_id}</td>
//                   <td className="px-4 py-4">{ticket.issue_type}</td>
//                   <td className="px-4 py-4">{ticket.user_id}</td>
//                   <td className="px-4 py-4">{ticket.location}</td>
//                   <td className="px-4 py-4">{ticket.formattedTimestamp}</td>
//                   <td className="px-4 py-4">
//                     <select
//                       value={ticket.status}
//                       onChange={(e) => handleStatusChange(ticket.ticket_id, e.target.value)}
//                       className="px-3 py-1 rounded-full text-xs"
//                     >
//                       <option value="Open">Open</option>
//                       <option value="In Progress">In Progress</option>
//                       <option value="Resolved">Resolved</option>
//                     </select>
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs ml-2 ${getStatusColor(ticket.status)}`}
//                     >
//                       {ticket.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-4">
//                     <button
//                       onClick={() => handleDelete(ticket.ticket_id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <FiTrash2 className="w-5 h-5" />
//                     </button>
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






// ==========================================================================
// ==========================================================================
// ==========================================================================







// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import PropTypes from 'prop-types';
// import moment from 'moment';
// import { FiTrash2 } from 'react-icons/fi';

// const TicketList = ({ onDataChange }) => {
//   const [tickets, setTickets] = useState([]);
//   const [issueType, setIssueType] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [notification, setNotification] = useState({ message: '', type: '' });
//   const [availableIssueTypes, setAvailableIssueTypes] = useState([]);

//   const fetchIssueTypes = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/admin/issue-types');
//       setAvailableIssueTypes(response.data);
//     } catch (error) {
//       console.error('Error fetching issue types:', error);
//       setNotification({ message: 'Failed to fetch issue types. Please try again.', type: 'error' });
//     }
//   };

//   const fetchTickets = async () => {
//     setIsLoading(true);
//     try {
//       const url = issueType
//         ? `http://localhost:5000/api/admin/tickets/${issueType}`
//         : `http://localhost:5000/api/admin/tickets`;
//       const response = await axios.get(url);

//       const ticketsWithTimestamps = response.data.map((ticket) => ({
//         ...ticket,
//         formattedTimestamp: moment(ticket.timestamp || new Date()).format('DD-MM-YYYY HH:mm:ss'),
//       }));

//       setTickets(ticketsWithTimestamps);
//       if (onDataChange) {
//         onDataChange();
//       }
//     } catch (error) {
//       console.error('Error fetching tickets:', error);
//       setNotification({ message: 'Failed to fetch tickets. Please try again.', type: 'error' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//     fetchIssueTypes();
//   }, [issueType]);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/tickets/${id}`);
//       const updatedTickets = tickets.filter((ticket) => ticket._id !== id);
//       setTickets(updatedTickets);
//       setNotification({ message: 'Ticket deleted successfully.', type: 'success' });
//     } catch (error) {
//       console.error('Error deleting ticket:', error);
//       setNotification({ message: 'Failed to delete the ticket. Please try again.', type: 'error' });
//     }
//   };

//   const handleStatusChange = async (ticketId, newStatus) => {
//     try {
//       const ticketIndex = tickets.findIndex((ticket) => ticket._id === ticketId);
//       if (ticketIndex !== -1) {
//         const updatedTicket = { ...tickets[ticketIndex], status: newStatus };
//         const updatedTickets = [...tickets];
//         updatedTickets[ticketIndex] = updatedTicket;
//         setTickets(updatedTickets);
//         setNotification({ message: `Status updated to ${newStatus}.`, type: 'success' });
//       }
//     } catch (error) {
//       console.error('Error updating status:', error);
//       setNotification({ message: 'Failed to update status. Please try again.', type: 'error' });
//     }
//   };

//   const filteredTickets = tickets.filter(
//     (ticket) =>
//       ticket.ticket_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ticket.issue_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ticket.user_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ticket.location?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Open':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'In Progress':
//         return 'bg-blue-100 text-blue-800';
//       case 'Resolved':
//         return 'bg-green-100 text-green-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md">
//       {/* Notification UI */}
//       {notification.message && (
//         <div
//           className={`p-4 mb-4 text-sm rounded-lg ${
//             notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//           }`}
//         >
//           {notification.message}
//         </div>
//       )}

//       {/* Filters */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex flex-wrap gap-4">
//           {/* Dynamic Issue Type Dropdown */}
//           <select
//             value={issueType}
//             onChange={(e) => setIssueType(e.target.value)}
//             className="block w-full sm:w-48 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
//           >
//             <option value="">All Issues</option>
//             {/* Dynamically render issue types from MongoDB */}
//             {availableIssueTypes.map((type) => (
//               <option key={type} value={type}>
//                 {type.toUpperCase()}
//               </option>
//             ))}
//           </select>

//           {/* Search Input */}
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search tickets..."
//             className="block w-full sm:w-64 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
//           />

//           {/* Refresh Button */}
//           <button
//             onClick={fetchTickets}
//             className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
//           >
//             Refresh
//           </button>

//           {/* Reset Button */}
//           <button
//             onClick={() => {
//               setSearchQuery('');
//               setIssueType('');
//             }}
//             className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
//           >
//             Reset Filters
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
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted On</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredTickets.map((ticket) => (
//                 <tr key={ticket.ticket_id}>
//                   <td className="px-6 py-4">{ticket.ticket_id}</td>
//                   <td className="px-6 py-4">{ticket.issue_type}</td>
//                   <td className="px-6 py-4">{ticket.user_id}</td>
//                   <td className="px-6 py-4">{ticket.location}</td>
//                   <td className="px-6 py-4">{ticket.formattedTimestamp}</td>
//                   <td className="px-6 py-4">
//                     <select
//                       value={ticket.status}
//                       onChange={(e) => handleStatusChange(ticket.ticket_id, e.target.value)}
//                       className="px-3 py-1 rounded-full text-xs"
//                     >
//                       <option value="Open">Open</option>
//                       <option value="In Progress">In Progress</option>
//                       <option value="Resolved">Resolved</option>
//                     </select>
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs ml-2 ${getStatusColor(ticket.status)}`}
//                     >
//                       {ticket.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <button
//                       onClick={() => handleDelete(ticket.ticket_id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <FiTrash2 className="w-5 h-5" />
//                     </button>
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















// import { useEffect, useState } from "react";
// import axios from "axios";
// import PropTypes from "prop-types";
// import moment from "moment";
// import { FiTrash2 } from "react-icons/fi"; // Import trash icon for delete

// const TicketList = ({ onDataChange }) => {
//   const [tickets, setTickets] = useState([]);
//   const [issueType, setIssueType] = useState(""); // To filter tickets based on issue type
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState(""); // Search query for tickets
//   const [notification, setNotification] = useState({ message: "", type: "" }); // Notification state
//   const [availableIssueTypes, setAvailableIssueTypes] = useState([]); // Available issue types from DB

//   // Fetch available issue types from the backend (dynamic)
//   const fetchIssueTypes = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/admin/issue-types");
//       setAvailableIssueTypes(response.data);
//     } catch (error) {
//       console.log("Error fetching issue types:", error);
//       setNotification({ message: "Failed to fetch issue types. Please try again.", type: "error" });
//     }
//   };

//   // Fetch tickets from the backend
//   const fetchTickets = async () => {
//     setIsLoading(true);
//     try {
//       const url = issueType
//         ? `http://localhost:5000/api/admin/tickets/${issueType}`
//         : `http://localhost:5000/api/admin/tickets`;
//       const response = await axios.get(url);

//       // Format timestamps for display
//       const ticketsWithTimestamps = response.data.map((ticket) => ({
//         ...ticket,
//         formattedTimestamp: moment(ticket.timestamp || new Date()).format("DD-MM-YYYY HH:mm:ss"),
//       }));

//       setTickets(ticketsWithTimestamps);
//       if (onDataChange) {
//         onDataChange();
//       }
//     } catch (error) {
//       console.log("Error fetching tickets:", error);
//       setNotification({ message: "Failed to fetch tickets. Please try again.", type: "error" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//     fetchIssueTypes(); // Fetch issue types dynamically on component mount
//   }, [issueType]);

//   // Handle ticket deletion
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/tickets/${id}`);
//       setTickets(tickets.filter((ticket) => ticket._id !== id)); // Update state after deletion
//       setNotification({ message: "Ticket deleted successfully.", type: "success" });
//     } catch (error) {
//       console.log("Error deleting ticket:", error);
//       setNotification({ message: "Failed to delete the ticket. Please try again.", type: "error" });
//     }
//   };

//   // Update ticket status
//   const handleStatusChange = async (ticketId, newStatus) => {
//     try {
//       const updatedTicket = await axios.patch(`http://localhost:5000/api/admin/tickets/${ticketId}`, { status: newStatus });
//       setTickets((prevTickets) =>
//         prevTickets.map((ticket) =>
//           ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
//         )
//       );
//       setNotification({ message: `Status updated to ${newStatus}.`, type: "success" });
//     } catch (error) {
//       console.log("Error updating status:", error);
//       setNotification({ message: "Failed to update status. Please try again.", type: "error" });
//     }
//   };

//   // Filter tickets based on search query
//   const filteredTickets = tickets.filter(
//     (ticket) =>
//       ticket.ticket_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ticket.issue_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ticket.user_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ticket.location?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Get status color for UI
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
//       {/* Notification UI */}
//       {notification.message && (
//         <div
//           className={`p-4 mb-4 text-sm rounded-lg ${
//             notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//           }`}
//         >
//           {notification.message}
//         </div>
//       )}

//       {/* Filters */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex flex-wrap gap-4">
//           {/* Dynamic Issue Type Dropdown */}
//           <select
//             value={issueType}
//             onChange={(e) => setIssueType(e.target.value)}
//             className="block w-full sm:w-48 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
//           >
//             <option value="">All Issues</option>
//             {/* Dynamically render issue types from MongoDB */}
//             {availableIssueTypes.map((type) => (
//               <option key={type} value={type}>
//                 {type.toUpperCase()}
//               </option>
//             ))}
//           </select>

//           {/* Search Input */}
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search tickets..."
//             className="block w-full sm:w-64 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
//           />
          
//           {/* Refresh Button */}
//           <button
//             onClick={fetchTickets}
//             className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
//           >
//             Refresh
//           </button>

//           {/* Reset Button */}
//           <button
//             onClick={() => {
//               setSearchQuery(""); // Clear search query
//               setIssueType("");    // Reset issue type filter
//             }}
//             className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
//           >
//             Reset Filters
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
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted On</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredTickets.map((ticket) => (
//                 <tr key={ticket.ticket_id}>
//                   <td className="px-6 py-4">{ticket.ticket_id}</td>
//                   <td className="px-6 py-4">{ticket.issue_type}</td>
//                   <td className="px-6 py-4">{ticket.user_id}</td>
//                   <td className="px-6 py-4">{ticket.location}</td>
//                   <td className="px-6 py-4">{ticket.formattedTimestamp}</td>
//                   <td className="px-6 py-4">
//                     <select
//                       value={ticket.status}
//                       onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
//                       className="px-3 py-1 rounded-full text-xs"
//                     >
//                       <option value="Open">Open</option>
//                       <option value="In Progress">In Progress</option>
//                       <option value="Resolved">Resolved</option>
//                     </select>
//                     <span className={`px-3 py-1 rounded-full text-xs ml-2 ${getStatusColor(ticket.status)}`}>
//                       {ticket.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <button
//                       onClick={() => handleDelete(ticket._id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <FiTrash2 className="w-5 h-5" />
//                     </button>
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


// import { useEffect, useState } from "react";
// import axios from "axios";
// import PropTypes from "prop-types";
// import moment from "moment";
// import { FiTrash2 } from "react-icons/fi"; // Import trash icon for delete

// const TicketList = ({ onDataChange }) => {
//   const [tickets, setTickets] = useState([]);
//   const [issueType, setIssueType] = useState(""); // To filter tickets based on issue type
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState(""); // Search query for tickets
//   const [notification, setNotification] = useState({ message: "", type: "" }); // Notification state
//   const [availableIssueTypes, setAvailableIssueTypes] = useState([]); // Available issue types from DB

//   // Fetch available issue types from the backend (dynamic)
//   const fetchIssueTypes = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/admin/issue-types");
//       setAvailableIssueTypes(response.data);
//     } catch (error) {
//       console.log("Error fetching issue types:", error);
//       setNotification({ message: "Failed to fetch issue types. Please try again.", type: "error" });
//     }
//   };

//   // Fetch tickets from the backend
//   const fetchTickets = async () => {
//     setIsLoading(true);
//     try {
//       const url = issueType
//         ? `http://localhost:5000/api/admin/tickets/${issueType}`
//         : `http://localhost:5000/api/admin/tickets`;
//       const response = await axios.get(url);

//       // Format timestamps for display
//       const ticketsWithTimestamps = response.data.map((ticket) => ({
//         ...ticket,
//         formattedTimestamp: moment(ticket.timestamp || new Date()).format("DD-MM-YYYY HH:mm:ss"),
//       }));

//       setTickets(ticketsWithTimestamps);
//       if (onDataChange) {
//         onDataChange();
//       }
//     } catch (error) {
//       console.log("Error fetching tickets:", error);
//       setNotification({ message: "Failed to fetch tickets. Please try again.", type: "error" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTickets();
//     fetchIssueTypes(); // Fetch issue types dynamically on component mount
//   }, [issueType]);

//   // Handle ticket deletion
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/tickets/${id}`);
//       setTickets(tickets.filter((ticket) => ticket._id !== id)); // Update state after deletion
//       setNotification({ message: "Ticket deleted successfully.", type: "success" });
//     } catch (error) {
//       console.log("Error deleting ticket:", error);
//       setNotification({ message: "Failed to delete the ticket. Please try again.", type: "error" });
//     }
//   };

//   // Filter tickets based on search query
//   const filteredTickets = tickets.filter(
//     (ticket) =>
//       ticket.ticket_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ticket.issue_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ticket.user_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ticket.location?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Get status color for UI
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
//       {/* Notification UI */}
//       {notification.message && (
//         <div
//           className={`p-4 mb-4 text-sm rounded-lg ${
//             notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//           }`}
//         >
//           {notification.message}
//         </div>
//       )}

//       {/* Filters */}
      
//       <div className="p-4 border-b border-gray-200">
//   <div className="flex flex-wrap gap-4">
//     {/* Dynamic Issue Type Dropdown */}
//     <select
//       value={issueType}
//       onChange={(e) => setIssueType(e.target.value)}
//       className="block w-full sm:w-48 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
//     >
//       <option value="">All Issues</option>
//       {/* Dynamically render issue types from MongoDB */}
//       {availableIssueTypes.map((type) => (
//         <option key={type} value={type}>
//           {type.toUpperCase()}
//         </option>
//       ))}
//     </select>

//     {/* Search Input */}
//     <input
//       type="text"
//       value={searchQuery}
//       onChange={(e) => setSearchQuery(e.target.value)}
//       placeholder="Search tickets..."
//       className="block w-full sm:w-64 px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
//     />
    
//     {/* Refresh Button */}
//     <button
//       onClick={fetchTickets}
//       className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
//     >
//       Refresh
//     </button>

//     {/* Reset Button */}
//     <button
//       onClick={() => {
//         setSearchQuery(""); // Clear search query
//         setIssueType("");    // Reset issue type filter
//       }}
//       className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
//     >
//       Reset Filters
//     </button>
//   </div>
// </div>


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
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted On</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredTickets.map((ticket) => (
//                 <tr key={ticket.ticket_id}>
//                   <td className="px-6 py-4">{ticket.ticket_id}</td>
//                   <td className="px-6 py-4">{ticket.issue_type}</td>
//                   <td className="px-6 py-4">{ticket.user_id}</td>
//                   <td className="px-6 py-4">{ticket.location}</td>
//                   <td className="px-6 py-4">{ticket.formattedTimestamp}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
//                       {ticket.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <button
//                       onClick={() => handleDelete(ticket._id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <FiTrash2 className="w-5 h-5" />
//                     </button>
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


