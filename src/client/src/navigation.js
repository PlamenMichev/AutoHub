import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import HomePage from './pages/home-page';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import CreateAdPage from './pages/createAd';
import AdsResultPage from './pages/ads-result';
import ProfilePage from './pages/profile-page';
import AdDetailsPage from './pages/ad-details';

const Navigation = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/createAd" component={CreateAdPage}/>
                <Route path="/search" component={AdsResultPage}/>
                <Route path="/profile" component={ProfilePage}/>
                <Route path="/ad" component={AdDetailsPage}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Navigation