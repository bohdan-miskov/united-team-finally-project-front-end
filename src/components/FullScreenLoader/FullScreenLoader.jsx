import { ClipLoader } from 'react-spinners';
import styles from './FullScreenLoader.module.css';

export default function FullScreenLoader({ text }) {
  return (
    <div className={styles.overlay}>
      <div className="container">
        <div className={styles.container}>
          <ClipLoader color="#3d2218" size={100} />
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </div>
  );
}
