import apiSlice from "../apiSlice";

const privateNoteEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    setKey: builder.mutation({
      query: (privateKey) => ({
        url: "enc/create-key",
        method: "POST",
        body: { key: privateKey },
      }),
      invalidatesTags: ["privateNote"],
    }),
    getKey: builder.query({
      query: () => "enc/",
      providesTags: ["privateNote"],
    }),
    resetKey: builder.mutation({
      query: (body) => ({
        url: "enc/edit-key",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["privateNote"],
    }),
    verifyKey: builder.mutation({
      query: ({ privateKey }) => ({
        url: "enc/verify-key",
        method: "POST",
        body: { privateKey },
      }),
      invalidatesTags: ["privateNote"],
      transformResponse: (response) => {
        localStorage.setItem("success", response.success);
        return response;
      },
    }),
  }),
});

export const {
  useSetKeyMutation,
  useGetKeyQuery,
  useResetKeyMutation,
  useVerifyKeyMutation,
} = privateNoteEndpoints;
