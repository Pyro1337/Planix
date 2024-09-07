import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Screen({ children }) {
  const token = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, []);

  return <>{children}</>;
}
