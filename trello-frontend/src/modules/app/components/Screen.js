import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authActions } from "../../auth/handlers/redux";
import { AppBar } from "../../common/components/AppBar";

export function Screen({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(authActions.setToken(true));
      navigate("/auth/login");
    }
  }, []);

  return <>{children}</>;
}
