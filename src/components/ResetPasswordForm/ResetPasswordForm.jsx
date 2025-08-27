import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';
import SuccessToastMessage from '../SuccessToastMessage/SuccessToastMessage';
import { resetPassword } from '../../redux/auth/operations'; // Ще не існує, додамо пізніше
import {
  selectAuthError,
  selectAuthIsLoading,
} from '../../redux/auth/selectors';
import styles from './resetPasswordForm.module.css'; // Створи цей файл CSS або використай існуючі

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
  // const { token } = useParams();
  const [token, setToken] = useState(null);
  const isLoading = useSelector(selectAuthIsLoading);
  const error = useSelector(selectAuthError);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  //   if (!token) {
  //     console.error('Reset token is missing');

  //     setSubmitting(false);
  //     return;
  //   }

  //   try {
  //     await dispatch(
  //       resetPassword({ token, password: values.password })
  //     ).unwrap();
  //     resetForm();
  //     setSuccessMessage('Password has been reset successfully!');

  //     setTimeout(() => navigate('/auth/login'), 3000);
  //   } catch (err) {
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };
  useEffect(() => {
    if (!token) {
      setToken('test-token-123'); // Встановлюємо фейковий токен для тестування
    }
  }, [token]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!token) {
      console.warn('No reset token provided. Submission blocked.');

      setSubmitting(false);
      return;
    }

    try {
      await dispatch(
        resetPassword({ token, password: values.password })
      ).unwrap();
      resetForm();
      setSuccessMessage('Password has been reset successfully!');
      setTimeout(() => navigate('/auth/login'), 3000);
    } catch (err) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.resetContainer} data-reset-password>
      <h2 className={styles.title}>Set New Password</h2>
      {successMessage && (
        <SuccessToastMessage>{successMessage}</SuccessToastMessage>
      )}
      <ErrorToastMessage>{error}</ErrorToastMessage>
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={ResetPasswordSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, touched, errors, isSubmitting }) => (
          <Form className={styles.form} noValidate>
            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.label}>
                New Password
              </label>
              <div className={styles.passwordWrapper}>
                {' '}
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
              />{' '}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm New Password
              </label>
              <div className={styles.passwordWrapper}>
                {' '}
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
              />{' '}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading || !token}
              className={`${styles.submitButton} brown-btn`}
            >
              {isLoading || isSubmitting ? 'Resetting...' : 'Reset Password'}
            </button>

            <p className={styles.redirectText}>
              {' '}
              Remember your password?{' '}
              <Link to="/auth/login" className={styles.link}>
                {' '}
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
