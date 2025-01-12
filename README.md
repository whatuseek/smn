# MERN Stack Ticket Management System

## Overview
The **Ticket Management System** is a full-stack web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). The application consists of two main parts:

1. **User-Ticket Module:** Allows users to submit tickets with specific information.
2. **Admin-Page Module:** Provides an admin interface for viewing, managing, and filtering tickets.

Both modules share a single MongoDB database, ensuring seamless data flow between the user and admin sides of the application.

---

## Key Features

### User-Ticket Module
- **Ticket Submission Form**  
  - Collects data such as User ID, Mobile Number, Location, Issue Type, Comments.
  - Automatically generates a unique Ticket ID for each submitted ticket.

- **Validation**  
  - Ensures the required fields are completed before submission.
  - Validates input formats (e.g., phone numbers).

### Admin-Page Module
- **Ticket Management Dashboard**  
  - Lists tickets with columns: Ticket ID, User ID, Mobile Number, Location, Issue Type, Comments, Status (Open, In Progress, Resolved).
  - Displays the timestamp when the ticket was created.

- **Ticket Filtering and Searching**  
  - Admins can filter tickets based on the Issue Type.
  - Admins can search tickets by Ticket ID, User ID, Location, etc.

- **Status Management**  
  - Admins can update ticket statuses directly from the dashboard.

- **Ticket Deletion**  
  - Admins can delete tickets with a confirmation dialog.

- **Responsive UI**  
  - Mobile-first design using **TailwindCSS**, ensuring a responsive experience on all devices.

---

## Technology Stack
- **Frontend:**  
  - **React.js**: For building dynamic and responsive components.
  - **TailwindCSS**: For efficient and customizable styling.
  - **Framer Motion**: For animations and transitions.

- **Backend:**  
  - **Node.js** & **Express.js**: For API development.
  - **MongoDB**: For database storage of tickets.
  - **Mongoose**: For schema definitions and interactions with MongoDB.
  - **Axios**: For handling HTTP requests between frontend and backend.

---

## Database Schema

### Ticket Schema
```json
{
  "ticket_id": "string",
  "user_id": "string",
  "mobile_number": "string",
  "location": "string",
  "issue_type": "string",
  "comments": "string",
  "status": "string",
  "timestamp": "date"
}
