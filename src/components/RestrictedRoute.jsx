import { Navigate } from "react-router-dom";

export default function RestrictedRoute({ component }) {
  //Add selector
  const isLoggedIn = false;
  return isLoggedIn ? <Navigate to={"/"} /> : component;
}
