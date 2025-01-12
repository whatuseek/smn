// File Path: admin-page/frontend/src/pages/TicketPage.jsx
import PropTypes from 'prop-types';
import TicketList from "../components/TicketList";
import Tickets from "../components/Tickets";

const TicketPage = ({ viewType }) => {
  return viewType === "all" ? <TicketList /> : <Tickets />;
};

// PropTypes validation
TicketPage.propTypes = {
  viewType: PropTypes.oneOf(['all', 'single']).isRequired
};

// Default props (optional)
TicketPage.defaultProps = {
  viewType: 'all'
};

export default TicketPage;
