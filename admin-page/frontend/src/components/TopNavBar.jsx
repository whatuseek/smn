// src/components/TopNavBar.jsx
import { useState } from 'react';
import { 
  FiBell, 
  FiSearch, 
  FiUser, 
  FiLogOut, 
  FiSettings, 
  FiHelpCircle,
  FiMenu 
} from 'react-icons/fi';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const TopNavBar = ({ title, searchQuery, setSearchQuery, isSidebarOpen, setSidebarOpen }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      message: 'New ticket assigned',
      time: '5 min ago',
      isRead: false
    },
    {
      id: 2,
      message: 'Ticket #123 updated',
      time: '1 hour ago',
      isRead: false
    },
    {
      id: 3,
      message: 'System maintenance scheduled',
      time: '2 hours ago',
      isRead: true
    }
  ]);

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FiMenu className="h-6 w-6" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-gray-800">{title}</h1>
          </div>

          {/* Center - Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search tickets..."
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiBell className="h-6 w-6" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                )}
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                      </div>
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 ${
                            !notification.isRead ? 'bg-blue-50' : ''
                          }`}
                        >
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                      <div className="px-4 py-2 border-t border-gray-100">
                        <a
                          href="#"
                          className="text-sm text-blue-600 hover:text-blue-500"
                        >
                          View all notifications
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <FiUser className="h-6 w-6 text-gray-500" />
                </div>
                <div className="hidden md:flex md:items-center md:space-x-2">
                  <span className="text-sm font-medium text-gray-700">Admin User</span>
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-1">
                      <a
                        href="#profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiUser className="mr-3 h-5 w-5 text-gray-400" />
                        Your Profile
                      </a>
                      <a
                        href="#settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiSettings className="mr-3 h-5 w-5 text-gray-400" />
                        Settings
                      </a>
                      <a
                        href="#help"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiHelpCircle className="mr-3 h-5 w-5 text-gray-400" />
                        Help Center
                      </a>
                      <div className="border-t border-gray-100">
                        <a
                          href="#signout"
                          className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                        >
                          <FiLogOut className="mr-3 h-5 w-5 text-red-400" />
                          Sign out
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TopNavBar.propTypes = {
  title: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};

export default TopNavBar;
