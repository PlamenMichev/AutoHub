import React from 'react';
import PageLayout from '../../components/page-layout';
import LatestAds from '../../components/latestAds';
import PageHeader from '../../components/page-header';
import SearchForm from '../../components/search-form';
import styles from '../../App.module.css';

function HomePage() {
  return (
    <div className={styles.wrapper}>
      <PageLayout>
        <LatestAds />
        <PageHeader title="Find the best cars!"/>
        <SearchForm />
      </PageLayout>
    </div>
  );
}

export default HomePage;
