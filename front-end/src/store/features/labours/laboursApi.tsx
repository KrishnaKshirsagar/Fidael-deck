// store/features/labours/laboursApi.ts
import { baseApi } from "../api/baseApi";
import type { Labour } from "../../../types/labours";

export const laboursApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLabours: builder.query<
      Labour[],
      { project_id?: string | number; search?: string }
    >({
      query: ({ project_id, search } = {}) => {
        const params = new URLSearchParams();
        if (project_id) params.append("project_id", String(project_id));
        if (search) params.append("search", search);

        return {
          url: `/labours?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Labours"],
    }),

    deleteLabour: builder.mutation<void, number>({
      query: (id) => ({
        url: `/labours/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Labours"],
    }),
  }),
});

export const { useLazyGetLaboursQuery, useDeleteLabourMutation } = laboursApi;
