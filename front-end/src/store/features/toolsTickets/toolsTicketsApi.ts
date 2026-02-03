import { baseApi } from "../api/baseApi";
import type { ToolTickets } from "../../../types/toolsTickets";

export const toolsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTools: builder.query<ToolTickets[], { project_id?: string | number }>({
      query: (params) => ({
        url: "/tools",
        params,
      }),
      providesTags: ["ToolTickets"],
    }),

    deleteTool: builder.mutation<void, number>({
      query: (id) => ({
        url: `/tools/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ToolTicket"],
    }),
  }),
});

export const { useLazyGetToolsQuery, useDeleteToolMutation } = toolsApi;
