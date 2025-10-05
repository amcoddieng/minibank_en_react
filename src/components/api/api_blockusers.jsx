import axios from "axios";

const API_BASE = "https://api-mini-bank.onrender.com/api";

export const blockUsers = async ({ ids, block }) => {
  try {
    const response = await axios.put(`${API_BASE}/user/blocked`, { ids, block });
    return response.data;
  } catch (err) {
    console.error("Erreur blocage/déblocage utilisateur(s) :", err);
    throw err;
  }
};