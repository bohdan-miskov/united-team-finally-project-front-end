// import { useParams } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import styles from "./authPage.module.css";

const AuthPage = () => {
  // const { authType } = useParams();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default AuthPage;
