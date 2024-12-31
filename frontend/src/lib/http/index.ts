import axios, { CreateAxiosDefaults } from "axios";
// In order this to work at vercel
// Set NEXT_PUBLIC_URL for production with the custom domain at vercel site
export const getBaseUrl = () => {
  const baseUrlEnv =
    process.env.NEXT_PUBLIC_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL;

  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "development") {
    return `http://${baseUrlEnv}`;
  }

  return `https://${baseUrlEnv}`;
};

export const getBaseApiUrl = () => {
  const baseUrl = getBaseUrl();
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "development") {
    return `${baseUrl}/api`;
  }

  return `${baseUrl}/api`;
};

const baseAxiosConfig: CreateAxiosDefaults = {
  baseURL: getBaseApiUrl(),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const api = axios.create(baseAxiosConfig);

export const BASE_URL = getBaseUrl();
