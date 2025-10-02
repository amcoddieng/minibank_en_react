import axios from "axios";

export const api_stat = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/getuserscount");
    console.log(response.data); // ✅ correction ici
    return response.data;
  } catch (error) {
    console.log("Erreur :", error);
    throw error;
  }
};
