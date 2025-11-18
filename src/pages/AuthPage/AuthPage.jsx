import { Outlet } from 'react-router-dom';
import styles from './authPage.module.css';

const AuthPage = () => {
  return (
    <section className={styles.authPageSection} data-login>
      <div className="container">
        <div className={`${styles.container} container`}>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
