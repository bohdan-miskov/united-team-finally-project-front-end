import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthIsLoading,
} from "../../redux/auth/selectors";
import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-hot-toast";
import { useState } from "react";
import ErrorToastMessage from "../ErrorToastMessage/ErrorToastMessage";
import { logInUser } from "../../redux/auth/operations";
import styles from "./loginForm.module.css";
import SuccessToastMessage from "../SuccessToastMessage/SuccessToastMessage";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .max(128, "Email must be at most 128 characters")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters")
    .required("Password is required"),
});
export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthIsLoading);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  // const [error, setError] = useState(null);

  const error = useSelector(selectAuthError);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(logInUser(values)).unwrap();
      resetForm();

      //  Додаємо повідомлення про успіх
      setSuccessMessage("Login successful!");
      navigate("/", { replace: true });
    } catch (error) {
      // Помилки зараз не обробляємо
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Login</h2>
      {successMessage && (
        <SuccessToastMessage>{successMessage}</SuccessToastMessage>
      )}
      <ErrorToastMessage>{error}</ErrorToastMessage>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}>
        {({ values, touched, errors, isSubmitting }) => (
          <Form className={styles.form} noValidate>
            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>
                Enter your email address
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="email@gmail.com"
                className={[
                  styles.input,
                  values.email ? styles.filled : "",
                  touched.email && errors.email ? styles.errorInput : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-invalid={touched.email && errors.email ? "true" : "false"}
                aria-describedby={
                  touched.email && errors.email ? "email-error" : undefined
                }
                autoComplete="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.label}>
                Enter your password
              </label>
              <div className={styles.passwordWrapper}>
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="*********"
                  className={[
                    styles.input,
                    styles.passwordInput,
                    values.password ? styles.filled : "",
                    touched.password && errors.password
                      ? styles.errorInput
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-invalid={
                    touched.password && errors.password ? "true" : "false"
                  }
                  aria-describedby={
                    touched.password && errors.password
                      ? "password-error"
                      : undefined
                  }
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}>
                  <svg>
                    <use
                      href={`/icons.svg#icon-${
                        showPassword ? "eye-stroke" : "eye-crossed"
                      }`}
                    />
                  </svg>
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={styles.submitButton}>
              {isLoading || isSubmitting ? "Logging in..." : "Login"}
            </button>

            <p className={styles.redirectText}>
              Don't have an account?{" "}
              <Link to="/auth/register" className={styles.link}>
                Register
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
