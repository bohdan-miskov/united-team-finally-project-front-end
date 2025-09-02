import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logInWithGoogle } from '../../redux/auth/operations';
import {
  selectAuthError,
  selectAuthIsLoading,
} from '../../redux/auth/selectors';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';
import { ERROR_MESSAGES } from '../../constants';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';

export default function GoogleRedirect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoading = useSelector(selectAuthIsLoading);
  const error = useSelector(selectAuthError);
  const errorMessages = {
    ...ERROR_MESSAGES,
    401: 'Your confirmation token has expired. Please register again.',
    404: 'Sorry, your account was not found. Please register again.',
  };
  useEffect(() => {
    const login = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        //const decodedCode = decodeURIComponent(code);
        await dispatch(logInWithGoogle(code)).unwrap();
      } finally {
        navigate('/', { replace: true });
      }
    };
    login();
  }, [dispatch, navigate, location]);
  return (
    <>
      {isLoading && (
        <FullScreenLoader text="We’re confirming your account. Please wait a moment..." />
      )}
      {error && (
        <ErrorToastMessage>
          {errorMessages[error.status] ??
            'We cannot confirm your account. Please try registering again later'}
        </ErrorToastMessage>
      )}
    </>
  );
}
