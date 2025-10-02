import axios from "axios";

// const API_BASE = "http://localhost:3000/api";

// // ➕ Créer un utilisateur
// export const createUser = async (user) => {
//   const res = await axios.post(`${API_BASE}/user`, user, {
//     headers: { "Content-Type": "application/json" },
//   });  
// //   console.log(res.data)
//   return res.data;
// };

// import axios from "axios";

export const createUser = async (formData) => {
  const res = await axios.post("http://localhost:3000/api/user", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
