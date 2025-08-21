import { NavLink } from "react-router-dom";

export default function ProfileNavigation() {
  return (
    <nav className="profile-nav">
      <NavLink 
        to="/profile/own" 
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        My Recipes
      </NavLink>
      <NavLink 
        to="/profile/favorites" 
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Saved Recipes
      </NavLink>
    </nav>
  );
}
