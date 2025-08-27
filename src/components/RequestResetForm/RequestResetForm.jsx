import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';
import SuccessToastMessage from '../SuccessToastMessage/SuccessToastMessage';
import { requestPasswordReset } from '../../redux/auth/operations';
import {
  selectAuthError,
  selectAuthIsLoading,
} from '../../redux/auth/selectors';
import styles from './requestResetForm.module.css';

const RequestResetSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .max(128, 'Email must be at most 128 characters')
    .required('Email is required'),
});

export default function RequestResetForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthIsLoading);
  const error = useSelector(selectAuthError);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(requestPasswordReset(values.email)).unwrap();
      resetForm();
      setSuccessMessage('Password reset link sent to your email!');

      // setTimeout(() => navigate('/auth/login'), 5000);
    } catch (err) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.resetContainer} data-reset-request>
      <h2 className={styles.title}>Reset Password</h2>
      {successMessage && (
        <SuccessToastMessage>{successMessage}</SuccessToastMessage>
      )}
      <ErrorToastMessage>{error}</ErrorToastMessage>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={RequestResetSchema}
        onSubmit={handleSubmit}
      >
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
                aria-invalid="false"
                autoComplete="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={`${styles.submitButton} brown-btn`}
            >
              {isLoading || isSubmitting ? 'Sending...' : 'Send Reset Link'}
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
