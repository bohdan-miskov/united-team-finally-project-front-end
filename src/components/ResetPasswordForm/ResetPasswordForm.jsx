import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';
import SuccessToastMessage from '../SuccessToastMessage/SuccessToastMessage';
import { resetPassword } from '../../redux/auth/operations';
import {
  selectAuthError,
  selectAuthIsLoading,
} from '../../redux/auth/selectors';
import {
  calculatePasswordStrength,
  getPasswordStrengthColor,
  getPasswordStrengthText,
} from '../../utils/passwordStrength.js';
import styles from './ResetPasswordForm.module.css';

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be at most 128 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function ResetPasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const isLoading = useSelector(selectAuthIsLoading);
  const error = useSelector(selectAuthError);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const errors = {
    400: 'Invalid or expired reset token. Please request a new password reset.',
    401: 'Unauthorized action. Please try again.',
    404: 'Reset token not found. Please request a new password reset.',
    422: 'Password does not meet requirements. Please try a stronger password.',
    500: 'Server error. Please try again later.',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!token) {
      setErrorMessage(
        'No reset token provided. Please request a new password reset.'
      );
      setSubmitting(false);
      return;
    }

    try {
      await dispatch(
        resetPassword({ token, password: values.password })
      ).unwrap();
      resetForm();
      setSuccessMessage('Password has been reset successfully!');
      setErrorMessage(null);
      setTimeout(() => navigate('/auth/login'), 3000);
    } catch (error) {
      setErrorMessage(
        errors[error.status] ?? 'An error occurred. Please try again.'
      );
      setSuccessMessage(null);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate('/auth/login', { replace: true });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  return (
    <div className={styles.resetContainer} data-reset-password>
      <h2 className={styles.title}>Set New Password</h2>
      {successMessage && (
        <SuccessToastMessage>{successMessage}</SuccessToastMessage>
      )}
      <ErrorToastMessage>{errorMessage}</ErrorToastMessage>
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={ResetPasswordSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, touched, errors, isSubmitting }) => {
          useEffect(() => {
            const strength = calculatePasswordStrength(values.password);
            setPasswordStrength(strength);
          }, [values.password]);

          return (
            <Form className={styles.form} noValidate>
              <div className={styles.fieldGroup}>
                <label htmlFor="password" className={styles.label}>
                  New Password
                </label>
                <div className={styles.passwordWrapper}>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="*********"
                    className={[
                      styles.input,
                      styles.passwordInput,
                      values.password ? styles.filled : '',
                      touched.password && errors.password
                        ? styles.errorInput
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-invalid={
                      touched.password && errors.password ? 'true' : 'false'
                    }
                    aria-describedby={
                      touched.password && errors.password
                        ? 'password-error'
                        : undefined
                    }
                  />
                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <svg>
                      <use
                        href={`/icons.svg#icon-${
                          showPassword ? 'eye-stroke' : 'eye-crossed'
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

                {values.password && (
                  <div className={styles.passwordStrengthContainer}>
                    <div className={styles.passwordStrengthMeter}>
                      <div
                        className={`${styles.strengthBar} ${
                          styles[getPasswordStrengthColor(passwordStrength)]
                        }`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      ></div>
                    </div>
                    {passwordStrength > 0 && (
                      <div
                        className={`${styles.passwordStrengthText} ${
                          styles[getPasswordStrengthColor(passwordStrength)]
                        }`}
                      >
                        {getPasswordStrengthText(passwordStrength)}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  Confirm New Password
                </label>
                <div className={styles.passwordWrapper}>
                  <Field
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="*********"
                    className={[
                      styles.input,
                      styles.passwordInput,
                      values.confirmPassword ? styles.filled : '',
                      touched.confirmPassword && errors.confirmPassword
                        ? styles.errorInput
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-invalid={
                      touched.confirmPassword && errors.confirmPassword
                        ? 'true'
                        : 'false'
                    }
                    aria-describedby={
                      touched.confirmPassword && errors.confirmPassword
                        ? 'confirmPassword-error'
                        : undefined
                    }
                  />
                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <svg>
                      <use
                        href={`/icons.svg#icon-${
                          showConfirmPassword ? 'eye-stroke' : 'eye-crossed'
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

              <button
                type="submit"
                disabled={isSubmitting || isLoading || !token}
                className={`${styles.submitButton} brown-btn`}
              >
                {isLoading || isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>

              <p className={styles.redirectText}>
                Remember your password?{' '}
                <Link to="/auth/login" className={styles.link}>
                  Login
                </Link>
              </p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
