// smn/user-ticket/backend/models/ticketModel.js

// Import mongoose and Counter models
import mongoose from 'mongoose';
import Counter from '../models/counterModel.js';

// Define the ticket schema
const ticketSchema = new mongoose.Schema({
  // User ID (required)
  user_id: {
    type: String,
    required: true
  },
  // Mobile number (required, validated)
  mobile_number: {
    type: String,
    required: true,
    validate: {
      // Validate mobile number using regular expression
      validator: (v) => /^\d{10}$/.test(v),
      message: 'Please enter a valid 10-digit mobile number'
    }
  },
  // Location (required, trimmed)
  location: {
    type: String,
    required: true,
    trim: true
  },
  // Issue type (required, validated)
  issue_type: {
    type: String,
    required: true,
    validate: {
      // Validate issue type against allowed values
      validator: (value) => {
        console.log(`Validating issue_type: ${value}`);
        const allowedValues =['HARDWARE', 'SOFTWARE', 'NETWORK','CONNECTION','SPEED','INTERMITTENT','ROUTER','BILLING','INSTALLATION','WIFI','SERVICE_OUTAGE','PACKAGE','TECHNICAL','DEVICE','OTHER'] ;
        const isValid = allowedValues.includes(value.toUpperCase());
        console.log(`isValid: ${isValid}`);
        return isValid;
      },
      message: 'Invalid issue type'
    }
  },
  // Comments (required, trimmed)
  comments: {
    type: String,
    required: true,
    trim: true
  },
  // Ticket ID (unique)
  ticket_id: {
    type: String,
    unique: true
  },
  // Type (default: 'user')
  type: {
    type: String,
    default: 'user'
  }
}, {
  // Enable timestamps (createdAt, updatedAt)
  timestamps: true
});

// Pre-save hook to generate ticket ID
ticketSchema.pre('save', function(next) {
  const ticket = this;
  if (!ticket.ticket_id) {
    const prefix = 'TKT-';
    const incrementingId = getIncrementingId();
    const paddedId = padZeroes(incrementingId, 6);
    ticket.ticket_id = `${prefix}${paddedId}`;
  }
  next();
});

// Function to get incrementing ID
async function getIncrementingId() {
  const counter = await Counter.findOne({}, 'ticketId');
  if (!counter) {
    return 1;
  }
  return counter.ticketId + 1;
}

// Function to pad zeroes
function padZeroes(value, length) {
  return value.toString().padStart(length, '0');
}

// Create Ticket model
const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;