// smn/admin-page/backend/controllers/adminController.js
import Ticket from "../models/ticketModel.js";

// Utility function to format timestamps
const formatTimestamp = (timestamp) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // AM/PM format
  }).format(new Date(timestamp));
};

// Fetch all unique issue types
export const getIssueTypes = async (req, res) => {
  try {
    const issueTypes = await Ticket.distinct("issue_type");
    res.status(200).json(issueTypes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching issue types" });
  }
};

// Fetch all tickets sorted by createdAt (latest first) with formatted timestamps
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({}).sort({ createdAt: -1 }); // Sort by latest first
    const formattedTickets = tickets.map((ticket) => ({
      ...ticket.toObject(),
      timestamp: formatTimestamp(ticket.createdAt), // Format createdAt timestamp
      location: ticket.location, // Include location field
    }));

    res.status(200).json(formattedTickets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets" });
  }
};

// Fetch tickets by issue type, sorted by createdAt (latest first), with formatted timestamps
export const getTicketsByIssueType = async (req, res) => {
  const { issue_type } = req.params;
  try {
    const tickets = await Ticket.find({ issue_type }).sort({ createdAt: -1 }); // Sort by latest first
    const formattedTickets = tickets.map((ticket) => ({
      ...ticket.toObject(),
      timestamp: formatTimestamp(ticket.createdAt), // Format createdAt timestamp
      location: ticket.location, // Include location field
    }));

    res.status(200).json(formattedTickets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets by issue type" });
  }
};



// import Ticket from "../models/ticketModel.js";

// // Utility function to format timestamps
// const formatTimestamp = (timestamp) => {
//   return new Intl.DateTimeFormat("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: true, // AM/PM format
//   }).format(new Date(timestamp));
// };

// // Fetch all unique issue types
// export const getIssueTypes = async (req, res) => {
//   try {
//     const issueTypes = await Ticket.distinct("issue_type");
//     res.status(200).json(issueTypes);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching issue types" });
//   }
// };

// // Fetch all tickets sorted by createdAt (latest first) with formatted timestamps
// export const getAllTickets = async (req, res) => {
//   try {
//     const tickets = await Ticket.find({}).sort({ createdAt: -1 }); // Sort by latest first
//     const formattedTickets = tickets.map((ticket) => ({
//       ...ticket.toObject(),
//       timestamp: formatTimestamp(ticket.createdAt), // Format createdAt timestamp
//     }));

//     res.status(200).json(formattedTickets);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching tickets" });
//   }
// };

// // Fetch tickets by issue type, sorted by createdAt (latest first), with formatted timestamps
// export const getTicketsByIssueType = async (req, res) => {
//   const { issue_type } = req.params;
//   try {
//     const tickets = await Ticket.find({ issue_type }).sort({ createdAt: -1 }); // Sort by latest first
//     const formattedTickets = tickets.map((ticket) => ({
//       ...ticket.toObject(),
//       timestamp: formatTimestamp(ticket.createdAt), // Format createdAt timestamp
//     }));

//     res.status(200).json(formattedTickets);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching tickets by issue type" });
//   }
// };


// //smn/admin-page/backend/controllers/adminController.js.js

// import Ticket from '../models/ticketModel.js';

// // Utility function to format timestamps
// const formatTimestamp = (timestamp) => {
//   return new Intl.DateTimeFormat('en-US', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     hour12: true, // AM/PM format
//   }).format(new Date(timestamp));
// };

// // Fetch all unique issue types
// export const getIssueTypes = async (req, res) => {
//   try {
//     const issueTypes = await Ticket.distinct('issue_type');
//     res.status(200).json(issueTypes);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching issue types' });
//   }
// };

// // Fetch all tickets with formatted timestamps
// export const getAllTickets = async (req, res) => {
//   try {
//     const tickets = await Ticket.find({});
//     const formattedTickets = tickets.map((ticket) => ({
//       ...ticket.toObject(),
//       timestamp: formatTimestamp(ticket.createdAt), // Format createdAt timestamp
//     }));

//     res.status(200).json(formattedTickets);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching tickets' });
//   }
// };

// // Fetch tickets by issue type with formatted timestamps
// export const getTicketsByIssueType = async (req, res) => {
//   const { issue_type } = req.params;
//   try {
//     const tickets = await Ticket.find({ issue_type });
//     const formattedTickets = tickets.map((ticket) => ({
//       ...ticket.toObject(),
//       timestamp: formatTimestamp(ticket.createdAt), // Format createdAt timestamp
//     }));

//     res.status(200).json(formattedTickets);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching tickets by issue type' });
//   }
// };
