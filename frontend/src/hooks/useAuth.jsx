import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useAuth(user) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
}

export default useAuth;
