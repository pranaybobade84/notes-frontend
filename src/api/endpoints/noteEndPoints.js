import apiSlice from "../apiSlice";

export const noteEndPoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => `note/`,
      providesTags: ["note"],
    }),
    addNote: builder.mutation({
      query: (body) => ({
        url: "note/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["note"],
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: `note/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["note"],
    }),
    editPinNote: builder.mutation({
      query: ({ id, pinStatus }) => ({
        url: `note/is-pinned/${id}`,
        method: "PATCH",
        body: { pinStatus },
      }),
      invalidatesTags: ["note"],
    }),
    editNote: builder.mutation({
      query: ({ id, title, content, noteColor }) => ({
        url: `note/edit/${id}`,
        method: "PATCH",
        body: { title, content, noteColor },
      }),
      invalidatesTags: ["note"],
    }),
    addToEncryption: builder.mutation({
      query: ({ id, isEncrypted }) => ({
        url: `note/is-encrypted/${id}`,
        method: "PATCH",
        body: { isEncrypted },
      }),
      invalidatesTags: ["note"],
    }),
    getPrivateNote: builder.query({
      query: () => "note/private-notes",
      providesTags: ["note"],
    }),
    searchNotes: builder.query({
      query: (searchQuery) => ({
        url: `note/search?query=${searchQuery}`,
        method: "GET",
      }),
      providesTags: ["note"],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNoteMutation,
  useDeleteNoteMutation,
  useEditPinNoteMutation,
  useEditNoteMutation,
  useAddToEncryptionMutation,
  useGetPrivateNoteQuery,
  useSearchNotesQuery,
} = noteEndPoints;
