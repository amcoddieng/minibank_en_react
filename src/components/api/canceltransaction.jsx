import axios from "axios";

const API_BASE = "http://localhost:3000/api";

// ✅ Annuler une transaction
export const cancelTransaction = async (idTransaction) => {
  const res = await axios.post(`${API_BASE}/annulerdepot`, { idTransaction });
  return res.data;
};

// // ✅ Récupérer toutes les transactions
// export const getTransactions = async () => {
//   const res = await axios.get(`${API_BASE}/transactions`);
//   return res.data;
// };
