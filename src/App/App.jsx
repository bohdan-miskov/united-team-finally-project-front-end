import { lazy, Suspense } from 'react';
import Layout from '../components/Layout/Layout';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import RestrictedRoute from '../components/RestrictedRoute';
import ConfirmUser from '../components/ConfirmUser/ConfirmUser';

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
const EditRecipePage = lazy(() =>
  import('../pages/EditRecipePage/EditRecipePage')
);

function App() {
  return (
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
            path="/edit-recipe/:id"
            element={<PrivateRoute component={<EditRecipePage />} />}
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
            <Route path="confirm-email/:token" element={<ConfirmUser />} />
            <Route path="google-redirect/:token" element={<GoogleRed />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Toaster position="top-center" reverseOrder={false} />
    </Layout>
  );
}

export default App;
