import React, { useContext } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import HomePage from './pages/home-page';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import CreateAdPage from './pages/createAd';
import AdsResultPage from './pages/ads-result';
import ProfilePage from './pages/profile-page';
import AdDetailsPage from './pages/ad-details';
import UserContext from './user-context';

const Navigation = () => {
    const context = useContext(UserContext);
    const loggedIn = context.loggedIn;
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/login" component={!loggedIn ? LoginPage : Redirect}/>
                <Route path="/register" component={!loggedIn ? RegisterPage : Redirect}/>
                <Route path="/createAd" component={loggedIn ? CreateAdPage : Redirect}/>
                <Route path="/search" component={AdsResultPage}/>
                <Route path="/profile" component={loggedIn ? ProfilePage : Redirect}/>
                <Route path="/ad" component={AdDetailsPage}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Navigation