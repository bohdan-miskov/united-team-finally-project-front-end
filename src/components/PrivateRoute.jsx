import { Navigate } from "react-router-dom";

export default function PrivateRoute({ component }) {
  //Add selector
  const isLoggedIn = true;
  return isLoggedIn ? component : <Navigate to={"/auth/login"} />;
}
