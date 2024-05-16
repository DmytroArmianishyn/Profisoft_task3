import axiosInstance from "../../../api/axiosInstance";

export const usePlayer = () => {
    const getUserById = (id) => {
        return axiosInstance.get(`http://localhost:3004/players/${id}` )
    }
    return getUserById;
}
