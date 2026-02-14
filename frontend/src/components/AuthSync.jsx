import { useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";

const AuthSync = ({ backendURL }) => {
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn) return;

      try {
        const token = await getToken();

        await axios.post(
          `${backendURL}/api/user/register`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      } catch (error) {
        console.log("User sync error:", error);
      }
    };

    syncUser();
  }, [isSignedIn]);

  return null; // no UI
};

export default AuthSync;
