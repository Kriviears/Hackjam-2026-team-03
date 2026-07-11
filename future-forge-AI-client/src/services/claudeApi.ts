import axiosInstance from "../services/api";

export async function getRoadMap(data: Record<string, any>){
    const response = await axiosInstance.post("/ai/recommendation", data);
    return response.data;
}
