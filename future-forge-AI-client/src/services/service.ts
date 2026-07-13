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


export async function getOpportunities(role){
    const res = await axiosInstance.get(`/opportunities?role=${role}`);
    console.log(res);
    return res.data;
}


export async function getLocalTechGroups(){
    const res = await axiosInstance.get(`/techGroups`);
    console.log(res);
    return res.data;
}

export async function getUserRoadmap(userId: string){
    const response = await axiosInstance.get("/career-path", {
        params: { userId }
    });
    return response.data;
}