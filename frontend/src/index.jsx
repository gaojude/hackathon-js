import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Route, BrowserRouter as Router, Redirect} from "react-router-dom";
import {LandingPage} from "./pages/LandingPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import InventoryPage from "./pages/InventoryPage";
import {HomePage} from "./pages/HomePage";
import Navbar from "./components/Navbar";
import {ImageRecognitionPage} from "./pages/ImageReco";
import RecipesGenerator from "./pages/RecipesGenerator";
import {Spacer} from "./components/Layouts/Spacer";
import CurrentUserState from "./lib/CurrentUserState";

const withAuth = Component => (props) => {
    if (!CurrentUserState.get().userId || !CurrentUserState.get().loggedInState) {
        return <Redirect to={'/'} />
    }
    return <Component {...props} />;
}

const App = (
    <>
        <Router>
            <Navbar/>
            <Spacer height={24} />
            <div className={"app"}>
                <Route path={"/login"} component={LogInPage}/>
                <Route path={"/sign-up"} component={SignUpPage}/>
                <Route path={"/home"} component={HomePage}/>
                <Route exact path={"/"} component={LandingPage}/>
                <Route path={"/inventory"} component={withAuth(InventoryPage)}/>
                <Route path={'/bulk-upload'} component={withAuth(ImageRecognitionPage)}/>
                <Route path={'/recipes'} component={withAuth(RecipesGenerator)}/>
            </div>
        </Router>
    </>
)

ReactDOM.render(App, document.getElementById('root'))