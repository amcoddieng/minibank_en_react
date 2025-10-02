import axios from "axios";
const API_BASE = "http://localhost:3000/api";

export const updateUser = async (id, formData) => {
  const res = await axios.put(`${API_BASE}/users/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
