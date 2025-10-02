import axios from "axios";
import { getToken } from "./api_lofin";

const API_BASE = "http://localhost:3000/api";

export const makeDepot = async ({ compteDestinataire, montant, idCompteSource }) => {
  const token = getToken();
  const res = await axios.post(
    `${API_BASE}/depot`,
    { compteDestinataire, montant, idCompteSource },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
