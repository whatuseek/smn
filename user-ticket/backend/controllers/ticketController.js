// smn/user-ticket/backend/controllers/ticketController.js

import asyncHandler from 'express-async-handler';
import Ticket from '../models/ticketModel.js';
import Counter from '../models/counterModel.js';

// Function to get incrementing ID
async function getIncrementingId() {
  const counter = await Counter.findOne({}, 'ticketId');
  if (!counter) {
    await Counter.create({ ticketId: 1 });
    return 1;
  }
  const newTicketId = counter.ticketId + 1;
  await Counter.updateOne({}, { ticketId: newTicketId });
  return newTicketId;
}

// @desc    Create new ticket
// @route   POST /api/tickets
export const createTicket = asyncHandler(async (req, res) => {
  console.log('Received request body:', req.body); // Add this for debugging
  try {
    const { user_id, mobile_number, location, issue_type, comments } = req.body;

    // Validate input
    if (!user_id || !mobile_number || !location || !issue_type || !comments) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    // Generate unique ticket ID
    const ticketId = await getIncrementingId();

    // Create ticket
    const ticket = await Ticket.create({
      user_id,
      mobile_number,
      location,
      issue_type,
      comments,
      ticket_id: `TKT-${ticketId}`,
      type: 'user', // Add this line
    });

    console.log('Created ticket:', ticket); // Add this for debugging

    res.status(201).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    console.error('Error creating ticket:', error); // Add this for debugging
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Get all tickets
// @route   GET /api/tickets
export const getAllTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ type: 'user' }); // Modify this line
  res.status(200).json({
    success: true,
    count: tickets.length,
    data: tickets
  });
});