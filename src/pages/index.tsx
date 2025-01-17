import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check both localStorage and cookie on component mount
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const login = () => {
    // Set both localStorage and cookie
    localStorage.setItem("isAuthenticated", "true");
    document.cookie = "auth-token=demo; path=/";
    setIsAuthenticated(true);
    router.reload();
  };

  const logout = () => {
    // Clear both localStorage and cookie
    localStorage.removeItem("isAuthenticated");
    document.cookie =
      "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    setIsAuthenticated(false);
    router.reload();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Photo Gallery</h1>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={isAuthenticated ? logout : login}
          style={{
            padding: "10px 20px",
            backgroundColor: isAuthenticated ? "#ff4444" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {isAuthenticated ? "Logout" : "Login to View Photos"}
        </button>
      </div>
      {isAuthenticated && (
        <div style={{ marginTop: "20px" }}>
          <Link
            href="/photos"
            style={{
              color: "blue",
              textDecoration: "underline",
            }}
          >
            Go to Photo Gallery
          </Link>
        </div>
      )}
    </div>
  );
}
