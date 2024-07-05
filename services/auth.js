import axiosInstance from "~/ultis/apiService";

const login = async (payload) => {
    try {
        const { data } = await axiosInstance.post("/login", payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};
const register = async (payload) => {
    try {
        const { data } = await axiosInstance.post("/register", payload);
        return data;
    } catch (error) {
        console.log(error);
    }
};


export const AuthServices = {
    login,
    register,
}