import type { Product } from "../../../types/product";
import { baseApi } from "../api/baseApi";

export const materialsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all materials (optional project + search)
    getMaterials: builder.query<
      Product[],
      { project_id?: string | number; search?: string }
    >({
      query: ({ project_id, search }) => {
        const params = new URLSearchParams();
        if (project_id) params.append("project_id", String(project_id));
        if (search) params.append("search", search);

        return {
          url: `/materials?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Materials"],
    }),

    // Get material by ID
    getMaterialById: builder.query<Product, string | number>({
      query: (id) => `/materials/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Material", id }],
    }),

    // Create material
    createMaterial: builder.mutation<Product, Product>({
      query: (material) => ({
        url: "/materials",
        method: "POST",
        body: material,
      }),
      invalidatesTags: ["Materials"],
    }),

    // Update material
    updateMaterial: builder.mutation<
      Product,
      { id: string | number; changes: Partial<Product> }
    >({
      query: ({ id, changes }) => ({
        url: `/materials/${id}`,
        method: "PUT",
        body: changes,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Material", id },
        "Materials",
      ],
    }),

    // Delete material
    deleteMaterial: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `/materials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Materials"],
    }),
  }),
});

export const {
  useGetMaterialsQuery,
  useGetMaterialByIdQuery,
  useLazyGetMaterialsQuery,
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
} = materialsApi;
