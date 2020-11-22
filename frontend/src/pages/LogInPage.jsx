import React from "react";
import {observer} from "mobx-react";
import {Button, TextField} from "@material-ui/core";
import {Helmet} from "react-helmet";
import {BACK_END_URL} from "../consts/constants";
import {useHistory} from "react-router-dom";
import CurrentUserState from "../lib/CurrentUserState";
import axios from 'axios';

const LogInPage = () => {
    const history = useHistory();

    const LogInRequest = async (event) => {
        event.preventDefault();
        const {setLoggedIn} = CurrentUserState.get();
        const email = event.target[0].value;
        const password = event.target[1].value;
        const {data: {success, _id}} = await axios.post(`${BACK_END_URL}/login`, {email, password});
        setLoggedIn(success, _id);
        if (success) {
            history.push("/");
        }
    };

    return (
        <>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>mypantry.space - Login</title>
            </Helmet>
            <h1>mypantry.space - Login</h1>
            <form
                noValidate
                autoComplete="off"
                onSubmit={async (event) => {
                    await LogInRequest(event);
                }}
            >
                <TextField id="email" label="Email"/>
                <TextField
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                />
                <Button type="submit">Sign In!</Button>
            </form>
        </>
    );
};
export default observer(LogInPage);
