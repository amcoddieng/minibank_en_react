// src/api/auth.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const API_BASE = "https://api-mini-bank.onrender.com/api";

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_BASE}/login`, { email, password });
    return res.data; // { message, token }
  } catch (err) {
    throw err.response?.data?.error || "Erreur connexion";
  }
};

export const setToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");

// Extra : récupérer le payload du token pour le rôle
export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch {
    return null;
  }
};
export const getId = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch {
    return null;
  }
};
export const getUserName = () => {
  const token = getToken();
  if (!token) return { nom: "", prenom: "" ,email:""};
  const decoded = jwtDecode(token);

  return {_id: decoded.id || "", nom: decoded.nom || "", prenom: decoded.prenom || "" ,email:decoded.email, photo:decoded.photo || "ppppp"};
};