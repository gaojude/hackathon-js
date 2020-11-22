import React from "react";
import {Button, TextField} from "@material-ui/core";
import {Helmet} from "react-helmet";
import CurrentUserState from "../lib/CurrentUserState";
import {observer} from "mobx-react";
import {useHistory} from "react-router-dom";
import {BACK_END_URL} from "../consts/constants";
import axios from 'axios'

const SignUpPage = () => {
    const history = useHistory();

    const SignUpRequest = async (event) => {
        event.preventDefault();
        const {setLoggedIn} = CurrentUserState.get();
        const name = event.target[0].value;
        const email = event.target[1].value;
        const password = event.target[2].value;
        const {data: {success, _id}} = await axios.post(`${BACK_END_URL}/signup`, {name, email, password})
        setLoggedIn(success, _id);
        if (success) {
            history.push("/");
        }
    };

    return (
        <>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>mypantry.space - Sign Up</title>
            </Helmet>
            <h1>mypantry.space - Sign Up</h1>
            <form
                noValidate
                autoComplete="off"
                onSubmit={async (event) => {
                    await SignUpRequest(event);
                }}
            >
                <TextField id="name" label="Name"/>
                <TextField id="email" label="Email"/>
                <TextField
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                />
                <Button type="submit">Sign Up!</Button>
            </form>
        </>
    );
};
export default observer(SignUpPage);
