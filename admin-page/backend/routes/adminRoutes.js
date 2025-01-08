// smn/admin-page/backend/routes/adminRoutes.js
import express from "express";
import { getAllTickets, getTicketsByIssueType, getIssueTypes } from "../controllers/adminController.js";

const router = express.Router();

// Route to fetch all tickets
router.get("/tickets", getAllTickets);

// Route to fetch tickets by issue type
router.get("/tickets/:issue_type", getTicketsByIssueType);

// Route to fetch distinct issue types
router.get("/issue-types", getIssueTypes);

export default router;
