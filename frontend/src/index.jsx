import React from "react";
import ReactDOM from "react-dom";
import {Route, BrowserRouter as Router} from "react-router-dom";
import {LandingPage} from "./pages/LandingPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import InventoryPage from "./pages/InventoryPage";
import {HomePage} from "./pages/HomePage";
import Navbar from "./components/Navbar";
import {ImageRecognitionPage} from "./pages/ImageReco";
import RecipesGenerator from "./pages/RecipesGenerator";
import {Spacer} from "./components/Layouts/Spacer";

const App = (
    <>
        <Router>
            <Navbar/>
            <Spacer height={24} />
            <div className={"app"}>
                <Route path={"/login"} component={LogInPage}/>
                <Route path={"/sign-up"} component={SignUpPage}/>
                <Route path={"/inventory"} component={InventoryPage}/>
                <Route path={"/home"} component={HomePage}/>
                <Route path={'/bulk-upload'} component={ImageRecognitionPage}/>
                <Route path={'/recipes'} component={RecipesGenerator}/>
                <Route exact path={"/"} component={LandingPage}/>
            </div>
        </Router>
    </>
)

ReactDOM.render(App, document.getElementById('root'))