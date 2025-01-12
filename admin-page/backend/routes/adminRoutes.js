import express from 'express';
import { getAllTickets, getTicketsByIssueType, getIssueTypes, deleteTicket } from '../controllers/adminController.js';
import { updateTicketStatus } from '../controllers/adminController.js'; // Ensure correct import


const router = express.Router();

// Route to fetch all tickets
router.get('/tickets', getAllTickets);

// Route to fetch tickets by issue type
router.get('/tickets/:issue_type', getTicketsByIssueType);

// Route to fetch all unique issue types
router.get('/issue-types', getIssueTypes);

// Route to delete a ticket
router.delete('/tickets/:id', deleteTicket);

// Define the route for updating ticket status
router.put('/tickets/:ticket_id/status', updateTicketStatus);

// Update ticket status
router.put('/tickets/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(updatedTicket);
    } catch (err) {
        res.status(400).json({ message: "Error updating ticket status." });
    }
});


export default router;
