import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
// import { login } from "../../redux/auth/operations";
import styles from "./loginForm.module.css";

export default function LoginForm() {
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(login(values)).unwrap();
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}></h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form classname={styles.form}>
            <div classname={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>
                Enter your email address
              </label>
              <Field
                type="email"
                name="email"
                placeholder="email@gmail.com"
                className={styles.input}
              />
              <ErrorMessage
                name="email"
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
                  placeholder="••••••••"
                  className={styles.input}
                />
                <button
                  type="button"
                  classname={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword}
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
              {isSubmitting}
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
