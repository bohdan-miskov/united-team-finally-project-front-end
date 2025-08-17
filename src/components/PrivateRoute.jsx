import { Navigate } from "react-router-dom";

export default function PrivateRoute({ component }) {
  //const isLoggedIn
  return component;
  // return isLoggedIn ? component : <Navigate to={"/register"} />;
}
