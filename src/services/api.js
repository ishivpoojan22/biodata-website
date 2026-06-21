import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/**
 * Central RTK Query API service.
 *
 * Base URL is read from VITE_API_URL when provided, otherwise it falls back to
 * the relative "/api" path which is proxied to the Express server during dev
 * (see vite.config.js).
 */
const baseUrl = import.meta.env.VITE_API_URL || '/api'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Template', 'Profile'],
  endpoints: (builder) => ({
    // GET /api/templates
    getTemplates: builder.query({
      query: () => '/templates',
      providesTags: ['Template'],
    }),

    // GET /api/profile/:slug
    getProfileBySlug: builder.query({
      query: (slug) => `/profile/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Profile', id: slug }],
    }),

    // POST /api/profile
    createProfile: builder.mutation({
      query: (body) => ({
        url: '/profile',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),

    // PUT /api/profile/:id
    updateProfile: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/profile/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Profile', id },
        'Profile',
      ],
    }),

    // DELETE /api/profile/:id
    deleteProfile: builder.mutation({
      query: (id) => ({
        url: `/profile/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),

    // POST /api/upload/profile-photo
    uploadProfilePhoto: builder.mutation({
      query: (formData) => ({
        url: '/upload/profile-photo',
        method: 'POST',
        body: formData,
      }),
    }),

    // POST /api/upload/gallery
    uploadGallery: builder.mutation({
      query: (formData) => ({
        url: '/upload/gallery',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
})

export const {
  useGetTemplatesQuery,
  useGetProfileBySlugQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useUploadProfilePhotoMutation,
  useUploadGalleryMutation,
} = api
