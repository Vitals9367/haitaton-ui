import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import App from '../../../domain/app/App';
import './layout.styles.scss';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <App>
      <Header />
      <div className="pageContainer" role="main">
        {children}
      </div>
      <Footer />
    </App>
  );
};

export default Layout;
