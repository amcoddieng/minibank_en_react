import axios from "axios";

const API_BASE = "http://localhost:3000/api";

// ➕ Créer un utilisateur
export const createUser = async (user) => {
  const res = await axios.post(`${API_BASE}/user`, user, {
    headers: { "Content-Type": "application/json" },
  });
//   console.log(res.data)
  return res.data;
};
