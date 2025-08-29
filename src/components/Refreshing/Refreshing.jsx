import { ClipLoader } from 'react-spinners';
import styles from './Refreshing.module.css';

export default function Refreshing() {
  return (
    <div className={styles.overlay}>
      <div className="container">
        <div className={styles.container}>
          <ClipLoader color="#2563eb" size={50} />
          <p className={styles.text}>Refreshing user...</p>
        </div>
      </div>
    </div>
  );
}
