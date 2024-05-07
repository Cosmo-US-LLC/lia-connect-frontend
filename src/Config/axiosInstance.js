//axios configurations
import axios from "axios";
import { baseURL } from "./endpoint";

export const INSTANCE = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});
INSTANCE.interceptors.request.use((request) => {
    // if (request.url === "auth/refresh-tokens") {
    //     return request;
    // }
    return checkExpireToken(request);
});
INSTANCE.interceptors.response.use((response) => {
    return response;
});

export const insertToken = async (token) => {
    INSTANCE.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const checkExpireToken = (config) => {
    return executeSilentRefresh(config);
};

const executeSilentRefresh = async (config) => {
    function handleError(err) {
        delete config.headers.Authorization;
        return (window.location.href = "/");
    }
    try {
        const token = localStorage.getItem("accessToken");
        insertToken(token);
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    } catch (error) {
        return handleError(
            `Error: [${error.response.status || 500}] ${error.response.data.msg || "SERVER_ERROR"
            }`
        );
    }
};
