import { useDispatch, useSelector } from 'react-redux';
import { getOauthGoogleUrl } from '../../redux/auth/operations';
import { useEffect } from 'react';
import { selectOauthUrl } from '../../redux/auth/selectors';
import styles from './GoogleLoginButton.module.css';
export default function GoogleLoginButton() {
  const dispatch = useDispatch();

  const oauthUrl = useSelector(selectOauthUrl);

  useEffect(() => {
    dispatch(getOauthGoogleUrl());
  }, [dispatch]);

  return (
    oauthUrl && (
      <div>
        <a href={oauthUrl} className={styles.googleBtn} target="_blank">
          <svg className={styles.googleIcon}>
            <use href="/icons.svg#icon-google" />
          </svg>
          <span>Sign in with Google</span>
        </a>
      </div>
    )
  );
}
