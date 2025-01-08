// <-- (Reused from user-ticket)
// smn/admin-page/backend/models/ticketModel.js
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    mobile_number: { type: String, required: true },
    location: { type: String, required: true },
    issue_type: { type: String, required: true },
    comments: { type: String, required: true },
    ticket_id: { type: String, required: true, unique: true },
    type: { type: String, default: "user" }
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
