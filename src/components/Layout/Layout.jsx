import css from './Layout.module.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import Refreshing from '../Refreshing/Refreshing';

export default function Layout({ children }) {
  const isRefreshing = useSelector(selectIsRefreshing);

  return (
    <div className={css.container}>
      <Header />
      <div className={css.mainContent}>{children}</div>
      {isRefreshing && <Refreshing />}
      <Footer />
    </div>
  );
}
