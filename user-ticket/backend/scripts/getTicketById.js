// import axios from 'axios';

// const getTicketById = async (id) => {
//     try {
//         const response = await axios.get(`http://localhost:3000/api/tickets/${id}`);
//         console.log('Ticket details:', response.data);
//     } catch (error) {
//         if (error.response) {
//             console.error('Error response data:', error.response.data);
//             console.error('Error response status:', error.response.status);
//             console.error('Error response headers:', error.response.headers);
//         } else if (error.request) {
//             console.error('Error request data:', error.request);
//         } else {
//             console.error('Error message:', error.message);
//         }
//         console.error('Error config:', error.config);
//     }
// };

// // Replace 'your_ticket_id_here' with the actual ticket ID
// getTicketById('your_ticket_id_here');