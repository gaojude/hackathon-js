import React from "react";
import ReactDOM from "react-dom";
import Counter from "./components/Counter";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import InventoryPage from "./pages/InventoryPage";
import { HomePage } from "./pages/HomePage";
import Navbar from "./components/Navbar";
import {ImageRecognitionPage} from "./pages/ImageReco";

const App = (
  <>
    <Router>
      <Navbar />
      <div className={"app"}>
        <Route path={"/login"} component={LogInPage} />
        <Route path={"/sign-up"} component={SignUpPage} />
        <Route path={"/inventory"} component={InventoryPage} />
        <Route exact path={"/"} component={LandingPage} />
        <Route path={"/home"} component={HomePage} />
        <Route path={'/bulk-upload'} component={ImageRecognitionPage} />

      </div>
    </Router>
  </>
);

ReactDOM.render(App, document.getElementById("root"));
