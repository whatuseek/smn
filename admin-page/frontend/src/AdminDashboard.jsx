// smn/admin-page/frontend/src/AdminDashboard.jsx

import { Link } from 'react-router-dom'; // Import Link to handle routing
// import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>

      <div className="space-y-4">
        <Link to="/admin/tickets" className="block text-xl font-medium text-blue-600">
          View All Tickets
        </Link>
        <Link to="/admin/tickets/issue-type" className="block text-xl font-medium text-blue-600">
          View Tickets by Issue Type
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
