// api_updateuser.js
import axios from "axios";
const API_BASE = "http://localhost:3000/api";

export const updateUser = async (id, data) => {
  const res = await axios.put(`${API_BASE}/users/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(res.data);
  return res.data;
};
