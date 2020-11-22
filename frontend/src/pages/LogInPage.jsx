import React from "react";
import { observer } from "mobx-react";
import { Button, TextField } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { LOG_IN } from "../consts/constants";
import { useHistory } from "react-router-dom";
import CurrentUserState from "../lib/CurrentUserState";

const LogInPage = () => {
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
    setLoggedIn(results.success);
    if (results.success) {
      history.push("/");
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
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
        <TextField id="email" label="Email" />
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
