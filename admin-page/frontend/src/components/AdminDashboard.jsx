// src/components/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, 
  FiFileText, // Changed from FiTicket
  FiUsers, 
  FiSettings, 
  FiBarChart2 
} from 'react-icons/fi';
import TicketList from './TicketList';
import Sidebar from './Sidebar';
import TopNavBar from './TopNavBar';

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [stats, setStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    resolvedTickets: 0,
    avgResponseTime: '0h'
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats({
          totalTickets: 156,
          openTickets: 43,
          resolvedTickets: 113,
          avgResponseTime: '2.5h'
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const navigationItems = [
    { name: 'Dashboard', icon: FiHome, key: 'dashboard' },
    { name: 'Tickets', icon: FiFileText, key: 'tickets' }, // Changed from FiTicket
    { name: 'Users', icon: FiUsers, key: 'users' },
    { name: 'Settings', icon: FiSettings, key: 'settings' },
  ];

  const statItems = [
    { title: 'Total Tickets', value: stats.totalTickets, icon: FiFileText, color: 'blue' }, // Changed from FiTicket
    { title: 'Open Tickets', value: stats.openTickets, icon: FiBarChart2, color: 'yellow' },
    { title: 'Resolved', value: stats.resolvedTickets, icon: FiBarChart2, color: 'green' },
    { title: 'Avg Response', value: stats.avgResponseTime, icon: FiBarChart2, color: 'indigo' }
  ];

  const getColorClasses = (color) => ({
    border: `border-${color}-500`,
    text: `text-${color}-600`,
    icon: `text-${color}-500`
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        navigationItems={navigationItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className={`transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'ml-60' : 'ml-20'
      }`}>
        <TopNavBar 
          title={navigationItems.find(item => item.key === activeTab)?.name}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {statItems.map((stat, index) => {
                    const colors = getColorClasses(stat.color);
                    return (
                      <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${colors.border}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                            <p className={`text-2xl font-semibold mt-1 ${colors.text}`}>
                              {stat.value}
                            </p>
                          </div>
                          <stat.icon className={`w-8 h-8 ${colors.icon}`} />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Recent Tickets</h3>
                    <button 
                      onClick={() => setActiveTab('tickets')}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      View All
                    </button>
                  </div>
                  <TicketList onDataChange={() => {}} />
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'tickets' && (
              <motion.div
                key="tickets"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <TicketList onDataChange={() => {}} />
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold">Users Management</h3>
                {/* Add your users management component here */}
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold">Settings</h3>
                {/* Add your settings component here */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
