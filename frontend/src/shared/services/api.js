import axios from "axios";

// -------------------------
// Axios Instance
// -------------------------

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

console.log(import.meta.env.VITE_API_URL);
// -------------------------
// Attach JWT Token
// -------------------------

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});

// -------------------------
// AI API
// -------------------------
export const AIAPI = {

    chat(data) {
        return api.post("/ai/chat", data);
    },

};


// -------------------------
// Auth API
// -------------------------

export const AuthAPI = {

    login(data) {
        return api.post("/auth/login", data);
    },

    register(data) {
        return api.post("/auth/register", data);
    },

};

// -------------------------
// Dashboard API
// -------------------------

export const DashboardAPI = {

    getStats() {
        return api.get("/dashboard/stats");
    },

};

// -------------------------
// Company API
// -------------------------

export const CompanyAPI = {

    getAll() {
        return api.get("/companies");
    },

    getById(id) {
        return api.get(`/companies/${id}`);
    },

    create(data) {
        return api.post("/companies", data);
    },

    update(id, data) {
        return api.put(`/companies/${id}`, data);
    },

    delete(id) {
        return api.delete(`/companies/${id}`);
    },

};

// -------------------------
// Application API
// -------------------------

export const ApplicationAPI = {
    getAll() {
        return api.get("/applications/");
    },

    getById(id) {
        return api.get(`/applications/${id}`);
    },

    create(data) {
        return api.post("/applications/", data);
    },

    update(id, data) {
        return api.put(`/applications/${id}`, data);
    },

    delete(id) {
        return api.delete(`/applications/${id}`);
    },
};

// -------------------------
// Recruiter API
// -------------------------

export const RecruiterAPI = {

    getAll() {
        return api.get("/recruiters");
    },

};

// -------------------------
// Task API
// -------------------------

export const TaskAPI = {

    getAll() {
        return api.get("/tasks");
    },

};

// -------------------------

export default api;