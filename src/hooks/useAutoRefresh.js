import { useEffect } from "react";
import { useRefreshTokenMutation } from "../api/endpoints/authEndPoints";

const useAutoRefresh = () => {
  const [refreshToken, { isLoading, error }] = useRefreshTokenMutation();

  useEffect(() => {
    const interval = setInterval(async () => {
      const accessToken = localStorage.getItem("accessToken");

      // If the token doesn't exist, trigger the refresh
      if (!accessToken) {
        try {
          await refreshToken().unwrap();
        } catch (err) {
          console.error("Failed to refresh token:", err);
          clearInterval(interval); // Stop refreshing if it fails repeatedly
        }
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [refreshToken]);

  return { isLoading, error };
};

export default useAutoRefresh;
