import React from 'react';
import PageLayout from '../../components/page-layout';
import LatestAds from '../../components/latestAds';
import PageHeader from '../../components/page-header';
import SearchForm from '../../components/search-form';

function HomePage() {
  return (
    <div className="App">
      <PageLayout>
        <LatestAds />
        <PageHeader title="Find the best cars!"/>
        <SearchForm />
      </PageLayout>
    </div>
  );
}

export default HomePage;
