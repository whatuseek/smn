// // smn/admin-page/frontend/src/App.jsx

// src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  return (
    <AdminDashboard />

  );
};

export default App;









// import TicketList from './components/TicketList';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [ticketStats, setTicketStats] = useState({
//     total: 0,
//     open: 0,
//     resolved: 0
//   });

//   // Fetch ticket statistics
//   const fetchTicketStats = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/admin/tickets');
//       const tickets = response.data;
      
//       // Calculate statistics
//       const stats = {
//         total: tickets.length,
//         open: tickets.filter(ticket => ticket.status === 'Open' || !ticket.status).length,
//         resolved: tickets.filter(ticket => ticket.status === 'Resolved').length
//       };
      
//       setTicketStats(stats);
//     } catch (error) {
//       console.error('Error fetching ticket stats:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTicketStats();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
//         {/* Logo Section */}
//         <div className="flex items-center justify-between h-16 px-6 bg-gray-800">
//           <span className="text-xl font-semibold text-white">AdminPanel</span>
//           <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-300 hover:text-white">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {/* Navigation Menu */}
//         <nav className="mt-6 px-4 space-y-2">
//           <a href="#" className="flex items-center px-4 py-3 text-gray-300 bg-gray-800 rounded-lg">
//             <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//             </svg>
//             Dashboard
//           </a>
//           <a href="#" className="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-800 rounded-lg transition-colors duration-200">
//             <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
//             </svg>
//             Tickets
//           </a>
//           <a href="#" className="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-800 rounded-lg transition-colors duration-200">
//             <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//             </svg>
//             Users
//           </a>
//           <a href="#" className="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-800 rounded-lg transition-colors duration-200">
//             <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//             Settings
//           </a>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className={`lg:ml-64 transition-margin duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
//         {/* Top Navigation */}
//         <div className="bg-white shadow-sm">
//           <div className="flex items-center justify-between h-16 px-4 lg:px-8">
//             <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//             <div className="flex items-center">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="w-64 px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                   <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="text-gray-500 hover:text-gray-700">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//                 </svg>
//               </button>
//               <div className="relative">
//                 <button className="flex items-center space-x-2">
//                   <img
//                     className="w-8 h-8 rounded-full"
//                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=XXXXXXXXXXXXXXXXXXXX&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                     alt="User avatar"
//                   />
//                   <span className="text-sm font-medium text-gray-700">Admin</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Dashboard Content */}
//         <div className="p-4 lg:p-8">
//           {/* Stats Grid */}
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Total Tickets</p>
//                   <p className="text-2xl font-semibold text-gray-900">{ticketStats.total}</p>
//                 </div>
//                 <div className="p-3 bg-blue-50 rounded-full">
//                   <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Open Tickets</p>
//                   <p className="text-2xl font-semibold text-blue-600">{ticketStats.open}</p>
//                 </div>
//                 <div className="p-3 bg-blue-50 rounded-full">
//                   <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Resolved Today</p>
//                   <p className="text-2xl font-semibold text-green-600">{ticketStats.resolved}</p>
//                 </div>
//                 <div className="p-3 bg-green-50 rounded-full">
//                   <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Avg Response</p>
//                   <p className="text-2xl font-semibold text-purple-600">1.2h</p>
//                 </div>
//                 <div className="p-3 bg-purple-50 rounded-full">
//                   <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Ticket List Component */}
//           <TicketList onDataChange={fetchTicketStats} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
