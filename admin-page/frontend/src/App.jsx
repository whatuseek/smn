import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import TicketList from './TicketList'; // Import the TicketList component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes for the dashboard and ticket views */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin/tickets" element={<TicketList />} />
        {/* Other routes can be added similarly */}
      </Routes>
    </Router>
  );
};

export default App;
