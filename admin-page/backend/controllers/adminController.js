import Ticket from '../../../user-ticket/backend/models/ticketModel.js'; // Import model

// Get all tickets for the admin
export const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();  // Fetch tickets from MongoDB
        res.status(200).json({ success: true, data: tickets });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
export const getIssueTypes = async (req, res) => {
    try {
        // Fetch unique issue types from the tickets collection
        const issueTypes = await Ticket.distinct("issue_type");
        res.status(200).json({ success: true, data: issueTypes });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
// Get tickets filtered by issue type
export const getTicketsByIssueType = async (req, res) => {
    try {
        const { issueType } = req.params; // Get the issue type from the request parameters
        const tickets = await Ticket.find({ issue_type: issueType }); // Query tickets with the specific issue type
        res.status(200).json({ success: true, data: tickets });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
// Export all controller functions
