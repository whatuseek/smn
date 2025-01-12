// File Path: admin-page/frontend/src/pages/Dashboard.jsx
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;


// // smn/admin-page/frontend/src/components/Dashboard.jsx

// import PropTypes from 'prop-types';
// const Dashboard = ({ ticketStats }) => {
//     return (
//         <div className="p-4 lg:p-8">
//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
//                 {/* Total Tickets */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm font-medium text-gray-600">Total Tickets</p>
//                             <p className="text-2xl font-semibold text-gray-900">{ticketStats.total}</p>
//                         </div>
//                         <div className="p-3 bg-blue-50 rounded-full">
//                             <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>
//                 {/* Open Tickets */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm font-medium text-gray-600">Open Tickets</p>
//                             <p className="text-2xl font-semibold text-blue-600">{ticketStats.open}</p>
//                         </div>
//                         <div className="p-3 bg-blue-50 rounded-full">
//                             <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>
//                 {/* Resolved Tickets */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm font-medium text-gray-600">Resolved Tickets</p>
//                             <p className="text-2xl font-semibold text-green-600">{ticketStats.resolved}</p>
//                         </div>
//                         <div className="p-3 bg-green-50 rounded-full">
//                             <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>
//                 {/* Avg Response */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm font-medium text-gray-600">Avg Response</p>
//                             <p className="text-2xl font-semibold text-yellow-600">4h 15m</p>
//                         </div>
//                         <div className="p-3 bg-yellow-50 rounded-full">
//                             <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// Dashboard.propTypes = {
//     ticketStats: PropTypes.shape({
//         total: PropTypes.number.isRequired,
//         open: PropTypes.number.isRequired,
//         resolved: PropTypes.number.isRequired,
//     }).isRequired,
// };

// export default Dashboard;
