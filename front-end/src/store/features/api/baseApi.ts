import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL from environment variables or use a default
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      // You can add common headers here (e.g., auth token)
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}), // Endpoints are injected from other slices
  tagTypes: [], // Define tag types for cache invalidation
});
