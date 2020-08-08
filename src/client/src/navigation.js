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
import AdsResult from './pages/ads-result';

const Navigation = () => {
    return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/createAd" component={CreateAdPage}/>
            <Route path="/search" component={AdsResult}/>
        </Switch>
    </BrowserRouter>
    )
}

export default Navigation