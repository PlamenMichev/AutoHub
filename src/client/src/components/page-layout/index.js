import React from 'react';
import styles from './index.module.css';
import Header from '../../components/header';
import Footer from '../../components/footer';

function PageLayout(props) {
  return (
    <div className="App">
      <Header />
        <div className={styles.container}>
          {props.children}
        </div>
      <Footer />
    </div>
  );
}

export default PageLayout;
