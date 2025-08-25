import css from './Layout.module.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
export default function Layout({ children }) {
  return (
    <div className={css.container}>
      <Header />
      {/* <div className={css.mainContent}>{children}</div> */}
      <div>
        ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
        sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
        sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
      </div>
      <Footer />
    </div>
  );
}
