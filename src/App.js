import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider, useSelector } from 'react-redux';
import thunk from 'redux-thunk'

import Login from './components/Login'
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

const AuthenticateRoutes = () => {
    const isLoggedIn = useSelector((state) => (state.auth.isLoggedIn));
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/login" />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/dashboard">
                {!isLoggedIn
                    ? (<Redirect to="/login" />)
                    : <Dashboard />}
            </Route>
        </Switch>
    );
};

export default function App() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Switch>
                        <AuthenticateRoutes />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}
