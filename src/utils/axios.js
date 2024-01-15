import axios from "axios";

export const moviesInstance = axios.create({
  baseURL: "https://swapi.dev/api",
});

moviesInstance.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

moviesInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
