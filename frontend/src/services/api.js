import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const CompanyAPI = {

  getAll() {
    return api.get("/companies/");
  },

  create(company) {
    return api.post("/companies/", company);
  },

};

export default api;