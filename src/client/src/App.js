import React, { Component } from 'react';
import UserContext from './user-context';
import Spinner from './components/spinner';
import globalConstants from './global-constants';
import SearchContext from './search-context';

//Todo put in utils
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function deleteCookie( name ) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: null,
            user: null,
        }
    }

    logIn = (user) => {
        this.setState({
            loggedIn: true,
            user,
        });
    }

    logOut = () => {
        deleteCookie('auth');
        this.setState({
            loggedIn: false,
            user: null,
        });
        
    }

    componentDidMount() {
        const token = getCookie('auth');
        
        if (!token) {
            this.logOut();
            return;
        }

        fetch(`${globalConstants.serverUrl}/users/verify`, {
            headers: {
                'auth': token,
            },
        })
            .then(promise => {
                return promise.json()
            }).then((response) => {
                if (response.status) {
                    this.logIn({
                        id: response.user._id,
                        firstName: response.user.firstName,
                    });
                } else {
                    this.logOut();
                }
            });
    }

    render() {
        const {
            loggedIn,
            user,
        } = this.state;

        if (loggedIn === null) {
            return (
                <Spinner />
            )
        }

        return (
            <SearchContext.Provider value={null}>  
                <UserContext.Provider value={{
                    loggedIn,
                    user,
                    logIn: this.logIn,
                    logOut: this.logOut,
                }}>
                    {this.props.children}
                </UserContext.Provider>
            </SearchContext.Provider>
        )
    }
}

export default App;