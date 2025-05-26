import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import * as SecureStore from "expo-secure-store";

const url: string = "http://34.118.72.212/";

const createAxiosClient = (token: string | null = null): AxiosInstance => {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };

  const client = axios.create({
    baseURL: url,
    headers,
    timeout: 60000,
    withCredentials: false,
  });

  client.interceptors.request.use(
    async (config) => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error retrieving JWT token from Secure Store", error);
      }
      return config;
    },
    (error) => {
      // Handle request error here
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        SecureStore.deleteItemAsync("token");
      }
      throw error.response?.data;
    }
  );

  return client;
};
export default createAxiosClient;
