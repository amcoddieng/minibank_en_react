import axios from "axios";
const API_BASE = "https://api-mini-bank.onrender.com/api";

export const updateUser = async (id, formData) => {
  const res = await axios.put(`${API_BASE}/users/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
