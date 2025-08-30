import { lazy, Suspense, useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import RestrictedRoute from '../components/RestrictedRoute';
import Refreshing from '../components/Refreshing/Refreshing';
import { useDispatch } from 'react-redux';
import { refreshUser } from '../redux/auth/operations';

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const RecipeViewPage = lazy(() =>
  import('../pages/RecipeViewPage/RecipeViewPage')
);
const AddRecipePage = lazy(() =>
  import('../pages/AddRecipePage/AddRecipePage')
);
const ProfilePage = lazy(() => import('../pages/ProfilePage/ProfilePage'));
const AuthPage = lazy(() => import('../pages/AuthPage/AuthPage'));

const LoginForm = lazy(() => import('../components/LoginForm/LoginForm'));
const RegistrationForm = lazy(() =>
  import('../components/RegistrationForm/RegistrationForm')
);
const RequestResetForm = lazy(() =>
  import('../components/RequestResetForm/RequestResetForm')
);
const ResetPasswordForm = lazy(() =>
  import('../components/ResetPasswordForm/ResetPasswordForm')
);

function App() {
  const dispatch = useDispatch();
  const [isStartRefreshing, setIsStartRefreshing] = useState(false);

  useEffect(() => {
    async function startRefreshing() {
      try {
        setIsStartRefreshing(true);
        await dispatch(refreshUser()).unwrap();
      } finally {
        setIsStartRefreshing(false);
      }
    }
    startRefreshing();
  }, [dispatch]);

  return isStartRefreshing ? (
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
            path="/profile"
            element={
              <PrivateRoute
                component={<Navigate to="/profile/own" replace />}
              />
            }
          />
          <Route
            path="/profile/:recipeType"
            element={<PrivateRoute component={<ProfilePage />} />}
          />
          <Route
            path="/auth"
            element={<RestrictedRoute component={<AuthPage />} />}
          >
            <Route path="register" element={<RegistrationForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="request-reset" element={<RequestResetForm />} />
            <Route
              path="reset-password/:token"
              element={<ResetPasswordForm />}
            />
            <Route path="confirm-email/:token" element={null} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Toaster position="top-center" reverseOrder={false} />
    </Layout>
  );
}

export default App;
