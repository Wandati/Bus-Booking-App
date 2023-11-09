import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <div className="container text-center mt-5">
      <h1>404 - Not Found</h1>
      <p>The page you're looking for does not exist.</p>
      <p>Redirecting to the home page...</p>
    </div>
  );
};

export default NotFound;
