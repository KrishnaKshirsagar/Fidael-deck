import { baseApi } from "../api/baseApi";
import type { ProjectDocument } from "../../../types/documents";

export const documentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjectDocuments: builder.query<
      ProjectDocument[],
      { project_id: string | number }
    >({
      query: ({ project_id }) => ({
        url: `/documents?project_id=${project_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetProjectDocumentsQuery } = documentsApi;
