import { lazy, Suspense } from "react";
import Layout from "../components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import RestrictedRoute from "../components/RestrictedRoute";
import Refreshing from "../components/Refreshing/Refreshing";
import ProfileOwn from "../components/ProfileOwn/ProfileOwn";
import ProfileFavorites from "../components/ProfileFavorites/ProfileFavorites";

const MainPage = lazy(() => import("../pages/MainPage/MainPage"));
const RecipeViewPage = lazy(() =>
  import("../pages/RecipeViewPage/RecipeViewPage")
);
const AddRecipePage = lazy(() =>
  import("../pages/AddRecipePage/AddRecipePage")
);
const ProfilePage = lazy(() => import("../pages/ProfilePage/ProfilePage"));
const AuthPage = lazy(() => import("../pages/AuthPage/AuthPage"));

function App() {
  //Add selector
  const isRefreshing = false;
  return isRefreshing ? (
    <>
      <Refreshing />
    </>
  ) : (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/recipes/:id" element={<RecipeViewPage />} />
          <Route
            path="/add-recipe"
            element={<PrivateRoute component={<AddRecipePage />} />}
          />
          <Route
            path="/profile/:recipeType"
            element={<PrivateRoute component={<ProfilePage />} />}
          >
            <Route path="own" element={<ProfileOwn />} />
            <Route path="favorites" element={<ProfileFavorites />} />
          </Route>
          <Route
            path="/auth/:authType"
            element={<RestrictedRoute component={<AuthPage />} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
      <Toaster position="top-center" reverseOrder={false} />
    </Layout>
  );
}

export default App;
