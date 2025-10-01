import axios from "axios";

export const api_getusers = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/users");
        return response.data
    } catch (error) {
        throw error
    }
}