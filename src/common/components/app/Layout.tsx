import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import App from '../../../domain/app/App';
import styles from './Layout.module.scss';
import ServiceNotifications from '../serviceNotifications/ServiceNotifications';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <App>
      <div className={styles.layoutContainer}>
        <div>
          <Header />
          <ServiceNotifications />
        </div>
        <div className={styles.pageContainer} role="main">
          {children}
        </div>
        <Footer />
      </div>
    </App>
  );
};

export default Layout;
