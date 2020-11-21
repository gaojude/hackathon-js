import React from 'react'
import ReactDOM from 'react-dom'
import Counter from "./components/Counter";
import { Route, BrowserRouter as Router } from 'react-router-dom'
import {LandingPage} from "./pages/LandingPage";
import {HomePage} from "./pages/HomePage";
import {Navbar} from "./components/Navbar";

const App = (
    <>
        <Navbar />
        <Router>
            <div className={'app'}>
                <Route exact path={'/'} component={LandingPage} />
                <Route path={'/home'} component={HomePage} />
            </div>
        </Router>
    </>
);

ReactDOM.render(App, document.getElementById('root'));