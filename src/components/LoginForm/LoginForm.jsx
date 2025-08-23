import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
// import ErrorToastMessage from "../ErrorToastMessage/ErrorToastMessage";

// import { login } from "../../redux/auth/operations";
import styles from "./loginForm.module.css";

const fakeLogin = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === "wrong@test.com") {
        reject(new Error("Invalid email or password"));
      } else {
        resolve({ success: true });
      }
    }, 1000);
  });
};

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
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // const handleSubmit = async (values, { setSubmitting }) => {
  //   try {
  //     await dispatch(login(values)).unwrap();
  //     toast.success("Login successful!");
  //     navigate("/");
  //   } catch (error) {
  //     toast.error(error.message || "Login failed");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await fakeLogin(values);
      toast.success("Login successful!");
      resetForm();
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Login</h2>

      {/* {error && <ErrorToastMessage>{error}</ErrorToastMessage>} */}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
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
                className={styles.input}
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
                  className={`${styles.input} ${styles.passwordInput}`}
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

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}>
              {isSubmitting ? "Logging in..." : "Login"}
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
    </div> // НАПИСАТИ handleSubmit до onSubmit
  );
}
