// import axios from 'axios';

// const createTicket = async () => {
//     try {
//         const response = await axios.post('http://localhost:3000/api/tickets/create', {
//             userId: "60d0fe4f5311236168a109ca",
//             mobileNumber: "1234567890",
//             location: "New York",
//             issueType: "connection",
//             comment: "Having connection issues."
//         }, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         console.log('Ticket created:', response.data);
//     } catch (error) {
//         console.error('Error creating ticket:', error.response ? error.response.data : error.message);
//     }
// };

// createTicket();