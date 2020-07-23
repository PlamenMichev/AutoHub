import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import HomePage from './pages/home-page';
import LoginPage from './pages/login';

const Navigation = () => {
    return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/login" component={LoginPage}/>
        </Switch>
    </BrowserRouter>
    )
}

export default Navigation