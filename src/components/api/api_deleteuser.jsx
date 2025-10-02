import axios from "axios";

const API_BASE = "http://localhost:3000/api";

// Supprime plusieurs utilisateurs avec token
export const deleteUsers = async (ids) => {
  try {
    const token = localStorage.getItem("token"); // récupère le token

    if (!token) throw new Error("Utilisateur non authentifié");

    const res = await axios.delete(`${API_BASE}/users`, {
      data: { ids }, // nécessaire pour DELETE avec axios
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // envoie du token
      },
    });

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err.response?.data || err.message);
    throw err;
  }
};
