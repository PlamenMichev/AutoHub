import React from 'react';
import './app.css';
import Header from './components/header';
import Footer from './components/footer';
import LatestAds from './components/latestAds';

function App() {
  return (
    <div className="App">
      <Header />
      <LatestAds />
      <Footer />
    </div>
  );
}

export default App;
