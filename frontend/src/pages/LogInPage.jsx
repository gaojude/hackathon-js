import React from "react";
import { observer } from "mobx-react";
import { Button, TextField } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { LOG_IN } from "../consts/constants";
import { useHistory } from "react-router-dom";
import CurrentUserState from "../lib/CurrentUserState";
import styled from 'styled-components';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Spacer} from "../components/Layouts/Spacer";
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

const LogInPage = () => {
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

  const history = useHistory();

  const LogInRequest = async (event) => {
    event.preventDefault();
    const { setLoggedIn } = CurrentUserState.get();
    const response = await fetch(LOG_IN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: event.target[0].value,
        password: event.target[1].value,
      }),
    });
    const results = await response.json();
    setLoggedIn(results.success, results._id);
    if (results.success) {
      history.push("/");
    }
  };



  const classes = useStyles();

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login | My Pantry Space</title>
      </Helmet>
      <h1>Login to Continue</h1>
      <Card className={classes.root}>
        <CardMedia
            className={classes.media}
            image="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2235&q=80"
            title="Contemplative Reptile"
        />
        <CardContent>
          <form
              noValidate
              autoComplete="off"
              onSubmit={async (event) => {
                await LogInRequest(event);
              }}
          >
            <StyledColumn>
              <TextField id="email" label="Email" />
              <Spacer height={16}/>
              <TextField
                  label="Password"
                  type="password"
                  autoComplete="current-password"
              />
            </StyledColumn>
          </form>
        </CardContent>
        <Spacer height={16}/>
        <CardActions style={{display: 'flex', justifyContent: 'center'}}>
          <Button variant="contained" color="primary" type="submit">Sign In!</Button>
        </CardActions>
        <Spacer height={16}/>
      </Card>
    </Wrapper>
  );
};
export default observer(LogInPage);
