import apiSlice from "../apiSlice";

const userEndPoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPersonalInfo: builder.query({
      query: () => "user/me",
      providesTags: ["user"],
      transformResponse: (response) => {
        return response?.data;
      },
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "user/reset-password",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["user"],
    }),

    deleteAccount: builder.mutation({
      query: (password) => ({
        url: "user/delete-account",
        method: "DELETE",
        body: password,
      }),
      invalidatesTags: ["user"],
    }),

    editPersonalInfo: builder.mutation({
      query: (body) => ({
        url: "user/edit-info",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetPersonalInfoQuery,
  useResetPasswordMutation,
  useDeleteAccountMutation,
  useEditPersonalInfoMutation,
} = userEndPoints;
