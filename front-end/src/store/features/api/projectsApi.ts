import { baseApi } from "./baseApi";
import { ProjectStatus } from "../../../types/project";

export interface Project {
  id: string;
  projectId: string;
  projectName: string;
  client: string;
  city: string;
  totalPersonHours: number;
  supervisor: string;
  phone: string;
  status: ProjectStatus;
  expectedStartDate: string;
  expectedEndDate: string;
  createdAt: string;
  updatedAt: string;
  // Add other project fields as needed
}

export interface ProjectRequest {
  projectName: string;
  client: string;
  city: string;
  totalPersonHours: number;
  supervisor: string;
  phone: string;
  status: ProjectStatus;
  expectedStartDate: string;
  expectedEndDate: string;
}

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

    getProjectById: builder.query<Project, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Project", id }],
    }),

    createProject: builder.mutation<Project, ProjectRequest>({
      query: (project) => ({
        url: "/projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),

    updateProject: builder.mutation<
      Project,
      { id: string; changes: Partial<ProjectRequest> }
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
