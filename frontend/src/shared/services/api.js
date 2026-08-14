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
    ask(question) {
        return api.post("/ai/ask", {
            question,
        });
    },

    analyzeApplication(applicationId) {
        return api.post(
            `/ai/analyze/${applicationId}`
        );
    },
};


// -------------------------
// Access Requests API
// -------------------------
export const AccessRequestsAPI = {
    create: (data) =>
        api.post(
            "/access-requests",
            data
        ),
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

    changePassword(data) {
        return api.post("/auth/change-password", data);
    },
    getCurrentUser() {
        return api.get("/auth/me");
    },
};


// -------------------------
// User API
// -------------------------

export const UserAPI = {
    getAll() {
        return api.get("/users");
    },

    getById(id) {
        return api.get(`/users/${id}`);
    },

    create(data) {
        return api.post("/users", data);
    },

    update(id, data) {
        return api.put(`/users/${id}`, data);
    },

    delete(id) {
        return api.delete(`/users/${id}`);
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
        return api.get("/applications");
    },

    getById(id) {
        return api.get(`/applications/${id}`);
    },

    create(data) {
        return api.post("/applications", data);
    },

    update(id, data) {
        return api.put(`/applications/${id}`, data);
    },

    delete(id) {
        return api.delete(`/applications/${id}`);
    },

    generateCoverLetter(applicationId) {
        return api.post(
            `/ai/cover-letter/${applicationId}`
        );
    },

};


// -------------------------
// Recruiter API
// -------------------------

export const RecruiterAPI = {

    getAll() {
        return api.get("/recruiters");
    },

    getById(id) {
        return api.get(`/recruiters/${id}`);
    },

    create(data) {
        return api.post("/recruiters", data);
    },

    update(id, data) {
        return api.put(`/recruiters/${id}`, data);
    },

    delete(id) {
        return api.delete(`/recruiters/${id}`);
    },

};

// -------------------------
// Task API
// -------------------------

export const TaskAPI = {

    getAll() {
        return api.get("/tasks/");
    },

    getById(id) {
        return api.get(`/tasks/${id}`);
    },

    create(data) {
        return api.post("/tasks/", data);
    },

    update(id, data) {
        return api.put(`/tasks/${id}`, data);
    },

    delete(id) {
        return api.delete(`/tasks/${id}`);
    },

};


// -------------------------
// Profile API
// -------------------------

export const ProfileAPI = {

    getProfile() {

        return api.get("/profile");

    },

    updateProfile(data) {

        return api.put(
            "/profile",
            data
        );

    },

    uploadCV(file) {

        const formData =
            new FormData();

        formData.append(
            "file",
            file
        );

        return api.post(
            "/profile/cv",
            formData,
            {
                headers: {
                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );

    },

};


// -------------------------

export default api;