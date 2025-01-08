// import axios from 'axios';

// const getAllTickets = async () => {
//     try {
//         const response = await axios.get('http://localhost:3000/api/tickets/all');
//         console.log('All tickets:', response.data);
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

// getAllTickets();