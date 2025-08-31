import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
  const { token } = useParams();
  const isLoading = useSelector(selectAuthIsLoading);
  const error = useSelector(selectAuthError);
  const errorMessages = {
    ...ERROR_MESSAGES,
    401: 'Your confirmation token has expired. Please register again.',
    404: 'Sorry, your account was not found. Please register again.',
  };
  useEffect(() => {
    dispatch(confirmUser(token));
  }, [dispatch, token]);
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
