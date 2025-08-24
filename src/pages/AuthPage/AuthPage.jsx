import { useParams } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import styles from "./authPage.module.css";

const AuthPage = () => {
  const { authType } = useParams();

  return (
    <section className={styles.authPageSection}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {authType === "login" ? <LoginForm /> : <RegistrationForm />}
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
