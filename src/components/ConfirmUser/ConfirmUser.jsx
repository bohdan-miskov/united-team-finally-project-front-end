import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmUser } from '../../redux/auth/operations';
import {
  selectAuthError,
  selectAuthIsLoading,
} from '../../redux/auth/selectors';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';
import { ERROR_MESSAGES } from '../../constants';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';

export default function ConfirmUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const isLoading = useSelector(selectAuthIsLoading);
  const error = useSelector(selectAuthError);
  const errorMessages = {
    ...ERROR_MESSAGES,
    401: 'Your confirmation token has expired. Please register again.',
    404: 'Sorry, your account was not found. Please register again.',
  };
  useEffect(() => {
    const confirm = async () => {
      try {
        const res = await dispatch(confirmUser(token)).unwrap();
        if (res) {
          navigate('/');
        }
      } catch {
        console.log();
      }
    };
    confirm();
  }, [dispatch, token, navigate]);
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
