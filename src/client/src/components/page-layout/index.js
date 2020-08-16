import React from 'react';
import styles from './index.module.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import stylesApp from '../../App.module.css';

function PageLayout(props) {
  return (
    <div className={stylesApp.wrapper}>
      <Header />
        <div className={styles.container}>
          {props.children}
        </div>
      <Footer />
    </div>
  );
}

export default PageLayout;
