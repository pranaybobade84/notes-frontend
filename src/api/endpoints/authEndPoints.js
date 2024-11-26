import apiSlice from "../apiSlice";

const authEndPoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginApi: builder.mutation({
      query: ({ usernameOrEmail, password }) => ({
        url: `auth/login`,
        method: "POST",
        body: { usernameOrEmail, password },
      }),
      invalidatesTags: ["auth"],
      transformResponse: (response) => {
        const { data } = response;

        localStorage.setItem("accessToken", data?.accessToken);
        // if (data) {

        //   localStorage.setItem("accessToken", data?.accessToken);
        // const { data } = response;

        //   localStorage.setItem("accessToken", data?.accessToken);

        //   setTimeout(() => {
        //     localStorage.removeItem("accessToken");
        //   }, 5000);
        // }
        return response;
      },
    }),
    registerApi: builder.mutation({
      query: (body) => ({
        url: `user/register`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),
    logoutApi: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "auth/refresh-token",
        method: "POST",
      }),
      transformResponse: (response) => {
        const { data } = response;

        // if (data) {
        //   localStorage.setItem("accessToken", data?.accessToken);

        //   setTimeout(() => {
        //     localStorage.removeItem("accessToken");
        //   }, 5000);
        // }
        return response;
      },
    }),
  }),
});

export const {
  useLoginApiMutation,
  useRegisterApiMutation,
  useLogoutApiMutation,
  useRefreshTokenMutation,
} = authEndPoints;
