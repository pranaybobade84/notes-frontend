import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import SignIn from "./pages/auth/SignIn/index.jsx";
import SignUp from "./pages/auth/SignUp/index.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import SettingsAndActivity from "./pages/Settings/index.jsx";
import Account from "./pages/Account/index.jsx";
import SetPrivateKey from "./components/PrivateKey.jsx";
import PrivateNotes from "./pages/PrivateNotes/index.jsx";
import PrivateNoteAccessLogin from "./components/PrivateNoteAccessLogin.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { isAuthenticated } from "./utils/auth.js";
import ResetPassword from "./components/ResetPassword.jsx";
import EditProfile from "./components/EditProfileInfo.jsx";
import DeleteAccount from "./components/DeleteAccount.jsx";
import { ToastContainer } from "react-toastify";
import SearchResults from "./pages/SearchPage/index.jsx";

// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: isAuthenticated() ? (
      <Navigate to="/home" />
    ) : (
      <Navigate to="/sign-in" />
    ),
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/settings",
        element: <SettingsAndActivity />,
        children: [
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "private-key",
            element: <SetPrivateKey />,
          },
          {
            path: "verify-key",
            element: <PrivateNoteAccessLogin />,
          },
          {
            path: "reset-password",
            element: <ResetPassword />,
          },
          {
            path: "edit-profile",
            element: <EditProfile />,
          },
          {
            path: "delete-account",
            element: <DeleteAccount />,
          },
        ],
      },
      {
        path: "/private-notes",
        element: <PrivateNotes />,
      },
      {
        path: "/search",
        element: <SearchResults />,
      },
    ],
  },
]);

// Render the application
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer position="top-center" />
    <RouterProvider router={router} />
  </Provider>
);
