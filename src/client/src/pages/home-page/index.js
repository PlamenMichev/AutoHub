import React from 'react';
import PageLayout from '../../components/page-layout';
import LatestAds from '../../components/latestAds';
import PageHeader from '../../components/page-header';

function HomePage() {
  return (
    <div className="App">
      <PageLayout>
        <LatestAds />
        <PageHeader title="Find the best cars!"/>
      </PageLayout>
    </div>
  );
}

export default HomePage;
