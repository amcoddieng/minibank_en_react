import axios from "axios";

export const api_getusers = async () => {
    try {
        const response = await axios.get("https://api-mini-bank.onrender.com/api/users");
        return response.data
    } catch (error) {
        throw error
    }
}