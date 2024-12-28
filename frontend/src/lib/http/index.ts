import axios from "axios";

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

export const api = axios.create({
  baseURL: getBaseApiUrl(),
});

export const BASE_URL = getBaseUrl();
