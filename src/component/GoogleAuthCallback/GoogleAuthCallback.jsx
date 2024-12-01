import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoogleAuthData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
          const response = await fetch(
            `http://localhost:5000/auth/google/callback?code=${code}`,
            {
              method: "GET",
            }
          );

          const data = await response.json();

          if (data.token) {
            localStorage.setItem("authToken", data.token); // Save the token to localStorage
            navigate("/dashboard"); // Redirect to dashboard or home page
          } else {
            console.error("Google login failed");
          }
        }
      } catch (error) {
        console.error("Error during Google callback:", error);
      }
    };

    fetchGoogleAuthData();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default GoogleAuthCallback;
