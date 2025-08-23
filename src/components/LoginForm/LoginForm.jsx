import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthIsLoading,
} from "../../redux/auth/selectors";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import ErrorToastMessage from "../ErrorToastMessage/ErrorToastMessage";

import { logInUser } from "../../redux/auth/operations";
import styles from "./loginForm.module.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthIsLoading);
  const error = useSelector(selectAuthError);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(logInUser(values)).unwrap();

      toast.success("Login successful!");
      resetForm();
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Login</h2>

      {/* Показуємо toast-повідомлення через компонент */}
      <ErrorToastMessage>{error}</ErrorToastMessage>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        validateOnChange={false}>
        {({ values, touched, errors, isSubmitting, isValid, submitCount }) => {
          // Якщо користувач намагався сабмітити і є помилки → показуємо toast
          useEffect(() => {
            if (submitCount > 0 && !isValid) {
              toast.error("Please fix the highlighted errors");
            }
          }, [submitCount, isValid]);

          return (
            <Form className={styles.form} noValidate>
              {/* Email */}
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
                  aria-invalid={
                    touched.email && errors.email ? "true" : "false"
                  }
                  autoComplete="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>

              {/* Password */}
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
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() => setShowPassword(!showPassword)}>
                    <svg>
                      <use
                        href={`/icons.svg#icon-${
                          showPassword ? "eye-crossed" : "eye-stroke"
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

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
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
          );
        }}
      </Formik>
    </div>
  );
}
