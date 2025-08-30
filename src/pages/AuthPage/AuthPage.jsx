import { Outlet } from 'react-router-dom';
import styles from './authPage.module.css';

const AuthPage = () => {
  return (
    <section className={styles.authPageSection}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
