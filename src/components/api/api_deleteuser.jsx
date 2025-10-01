import axios from "axios";

const API_BASE = "http://localhost:3000/api";

// Supprime plusieurs utilisateurs en envoyant { ids: [...] }
export const deleteUsers = async (ids) => {
  const res = await axios.delete(`${API_BASE}/users`, {
    data: { ids }, // ✅ il faut data ici
    headers: { "Content-Type": "application/json" },
  });
  console.log(res.data);
  return res.data;
};