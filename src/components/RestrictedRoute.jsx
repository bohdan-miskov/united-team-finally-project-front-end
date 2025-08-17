import { Navigate } from "react-router-dom";

export default function RestrictedRoute({ component }) {
  // const isLoggedIn
  return component;
  // return isLoggedIn ? <Navigate to={"/contacts"} /> : component;
}
