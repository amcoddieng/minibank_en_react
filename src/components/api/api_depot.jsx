import axios from "axios";
import { getToken } from "./api_lofin";

const API_BASE = "https://api-mini-bank.onrender.com/api";

export const makeDepot = async ({ compteDestinataire, montant, idCompteSource }) => {
  const token = getToken();
  const res = await axios.post(
    `${API_BASE}/depot`,
    { compteDestinataire, montant, idCompteSource },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
