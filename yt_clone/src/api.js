import axios from "axios";

const authAxios = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    },
});

export const loginUser = async (email, password) => {
    try {
        const response = await authAxios.post("/auth/login", { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
};