import axiosInstance from "./api";

export async function getRoadMap(data: Record<string, any>){
    const response = await axiosInstance.post("/ai/recommendation", data);
    return response.data;
}

export async function login(data){
    const response = await axiosInstance.post("/login", data);
    console.log(response);
    return response.data;
}
