import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { registerAndLoginUser } from "../../redux/auth/operations";
import {
  selectAuthError,
  selectAuthIsLoading,
} from "../../redux/auth/selectors";
import styles from "./registrationForm.module.css";
import ErrorToastMessage from "../ErrorToastMessage/ErrorToastMessage";
import SuccessToastMessage from "../SuccessToastMessage/SuccessToastMessage";

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .max(16, "Name must be at most 16 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .max(128, "Email must be at most 128 characters")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  acceptTerms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthIsLoading);
  const error = useSelector(selectAuthError);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(registerAndLoginUser(values)).unwrap();
      resetForm();
      setSuccessMessage("Register successful!");
      navigate("/", { replace: true });
    } catch (error) {
      // Тимчасово без тостів, обробимо пізніше
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.title}>Register</h2>
      <p className={styles.description}>
        Join our community of culinary enthusiasts, save your favorite recipes,
        and share your cooking creations
      </p>

      {successMessage && (
        <SuccessToastMessage>{successMessage}</SuccessToastMessage>
      )}
      {error && <ErrorToastMessage>{error}</ErrorToastMessage>}

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          acceptTerms: false,
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={true}>
        {({ values, touched, errors, isSubmitting }) => (
          <Form className={styles.form} noValidate>
            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>
                Enter your email
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
                className={`${styles.error} ${styles.errorLabel}`}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="name" className={styles.label}>
                Enter your name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Max"
                className={[
                  styles.input,
                  values.name ? styles.filled : "",
                  touched.name && errors.name ? styles.errorInput : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-invalid={touched.name && errors.name ? "true" : "false"}
                aria-describedby={
                  touched.name && errors.name ? "name-error" : undefined
                }
                autoComplete="name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.label}>
                Create a strong password
              </label>
              <div className={styles.passwordWrapper}>
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="*********"
                  className={[
                    styles.input,
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
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}>
                  <svg width="24" height="24">
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

            <div className={styles.fieldGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Repeat your password
              </label>
              <div className={styles.passwordWrapper}>
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="*********"
                  className={[
                    styles.input,
                    values.confirmPassword ? styles.filled : "",
                    touched.confirmPassword && errors.confirmPassword
                      ? styles.errorInput
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-invalid={
                    touched.confirmPassword && errors.confirmPassword
                      ? "true"
                      : "false"
                  }
                  aria-describedby={
                    touched.confirmPassword && errors.confirmPassword
                      ? "confirmPassword-error"
                      : undefined
                  }
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <svg width="24" height="24">
                    <use
                      href={`/icons.svg#icon-${
                        showConfirmPassword ? "eye-stroke" : "eye-crossed"
                      }`}
                    />
                  </svg>
                </button>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.checkBoxGroup}>
              <label className={styles.checkBoxLabel}>
                <Field
                  type="checkbox"
                  name="acceptTerms"
                  id="acceptTerms"
                  className={styles.checkbox}
                />
                <svg className={styles.checkIcon}>
                  <use href="/icons.svg#icon-checkbox" />
                </svg>
                I agree to the Terms of Service and Privacy Policy
              </label>

              <ErrorMessage
                name="acceptTerms"
                component="div"
                className={styles.error}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}>
              {isLoading || isSubmitting ? "Creating..." : "Create account"}
            </button>

            <p className={styles.redirectText}>
              Already have an account?{" "}
              <Link to="/auth/login" className={styles.link}>
                Log in
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
