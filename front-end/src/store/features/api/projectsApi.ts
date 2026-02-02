import type { Project } from "../../../types/project";
import { baseApi } from "./baseApi";

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], { status?: string; search?: string }>(
      {
        query: ({ status, search }) => {
          const params = new URLSearchParams();
          if (status) params.append("status", status);
          if (search) params.append("search", search);
          return {
            url: `/projects?${params.toString()}`,
            method: "GET",
          };
        },
        providesTags: ["Projects"],
      },
    ),

    getProjectById: builder.query<Project, string | number>({
      query: (id) => `/projects/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Project", id }],
    }),

    createProject: builder.mutation<Project, Project>({
      query: (project) => ({
        url: "/projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),

    updateProject: builder.mutation<
      Project,
      { id: string | number; changes: Partial<Project> }
    >({
      query: ({ id, changes }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: changes,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Project", id },
        "Projects",
      ],
    }),

    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
