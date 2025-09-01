import { useDispatch, useSelector } from 'react-redux';
import { getOauthGoogleUrl } from '../../redux/auth/operations';
import { useEffect } from 'react';
import { selectOauthUrl } from '../../redux/auth/selectors';
import styles from './GoogleLoginButton.module.css';
import Loader from '../Loader/Loader';
export default function GoogleLoginButton() {
  const dispatch = useDispatch();

  const oauthUrl = useSelector(selectOauthUrl);

  useEffect(() => {
    dispatch(getOauthGoogleUrl());
  }, [dispatch]);

  return oauthUrl ? (
    <div className={styles.wrapper}>
      <a href={oauthUrl} className={styles.googleBtn}>
        <svg className={styles.googleIcon}>
          <use href="/icons.svg#icon-google" />
        </svg>
        <span className={styles.btnText}>Sign in with Google</span>
      </a>
    </div>
  ) : (
    <Loader />
  );
}
