import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectCredentials, logout } from './AuthSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/",
  credentials: "include", // Corrected this to a string
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().auth.token;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  }
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    getUser: builder.query({
      query: (id) => `users/${id}`,
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: `users/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
    createClassroom: builder.mutation({
      query: (body) => ({
        url: 'classrooms',
        method: 'POST',
        body,
      }),
    }),
    updateClassroom: builder.mutation({
      query: (body) => ({
        url: `classrooms/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteClassroom: builder.mutation({
      query: (id) => ({
        url: `classrooms/${id}`,
        method: 'DELETE',
      }),
    }),
 
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateClassroomMutation,
  useUpdateClassroomMutation,
  useDeleteClassroomMutation,
 
} = apiSlice;
