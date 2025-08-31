import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logInWithGoogle } from '../../redux/auth/operations';
import { useState } from 'react';

export default function GoogleLoginButton({ redirectTo = '/' }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSuccess = async credentialResponse => {
    try {
      const credential = credentialResponse.credential;

      await dispatch(logInWithGoogle(credential)).unwrap();
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error('Google login error:', err);
      setError('Google authorization failed');
    }
  };

  const handleError = () => {
    setError('Google sign-in failed. Try again.');
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        shape="rectangular"
        theme="filled_blue"
        text="signin_with"
        width="100%"
        useOneTap={false}
      />
      {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
    </div>
  );
}
