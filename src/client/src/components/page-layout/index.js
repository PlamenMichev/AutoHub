import React from 'react';
import styles from './index.module.css';
import Header from '../../components/header';
import Footer from '../../components/footer';

function PageLayout(props) {
  return (
    <div className="App">
      <Header />
        {props.children}
      <Footer />
    </div>
  );
}

export default PageLayout;
