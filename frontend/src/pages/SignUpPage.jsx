import React from "react";
import {Button, TextField} from "@material-ui/core";
import {Helmet} from "react-helmet";
import CurrentUserState from "../lib/CurrentUserState";
import {observer} from "mobx-react";
import {useHistory} from "react-router-dom";
import {BACK_END_URL} from "../consts/constants";
import axios from 'axios'
import styled from "styled-components";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardContent from "@material-ui/core/CardContent";
import {Spacer} from "../components/Layouts/Spacer";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-begin;
  height: 100vh;
  width: 100%;
  background-size: cover; 
  align-items: center;
`

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
`
const useStyles = makeStyles({
    root: {
        minWidth: 320,
        maxWidth: 400,
        opacity: 1,
        zIndex: 100
    },
    media: {
        height: 140,
    },
});

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

    const classes = useStyles();

    return (
        <Wrapper>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Sign Up | My Pantry Space</title>
            </Helmet>
            <h1>Join Us by Signing Up</h1>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3734&q=80"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <form
                        noValidate
                        autoComplete="off"
                        onSubmit={async (event) => {
                            await SignUpRequest(event);
                        }}
                    >
                        <StyledColumn>
                            <TextField id="name" label="Name"/>
                            <Spacer height={16}/>
                            <TextField id="email" label="Email"/>
                            <Spacer height={16}/>
                            <TextField
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />
                            <Spacer height={32}/>
                            <Button variant="contained" color="primary" type="submit">Sign Up!</Button>
                        </StyledColumn>
                    </form>
                </CardContent>
            </Card>
        </Wrapper>
    );
};
export default observer(SignUpPage);
