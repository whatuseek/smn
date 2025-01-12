// src/components/Sidebar.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import PropTypes from 'prop-types';

const Sidebar = ({ 
  navigationItems, 
  activeTab, 
  setActiveTab, 
  isSidebarOpen, 
  setSidebarOpen 
}) => {
  return (
    <motion.div 
      initial={false}
      animate={{ width: isSidebarOpen ? '240px' : '80px' }}
      className="fixed left-0 top-0 h-full bg-white shadow-lg z-30"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xl font-bold text-gray-800"
            >
              Admin Panel
            </motion.h1>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`w-full flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              activeTab === item.key 
                ? 'bg-blue-50 text-blue-600' 
                : 'hover:bg-gray-100'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-medium"
                >
                  {item.name}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </nav>
    </motion.div>
  );
};

Sidebar.propTypes = {
  navigationItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};

export default Sidebar;
