// import axios from "axios";
// const token = localStorage.getItem('token');

// const config = {
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true
// };

// const configWithToken = {
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   },
//   withCredentials: true // This ensures cookies are sent with the request if needed
// };

// export const userAccountDelete = async(id) => {
//   try{
//     return await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/deleteAccount/${id}`,configWithToken);
//   } catch(error) {
//     console.log(error);
//   }
// }