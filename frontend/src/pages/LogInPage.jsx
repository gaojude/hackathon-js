import React from "react";
import { Button, TextField } from "@material-ui/core";
import { Helmet } from "react-helmet";
const { LOG_IN } = require("../consts/constants");

const LogInRequest = async (event) => {
  //const { setLoggedIn } = CurrentUserState.get();
  event.preventDefault();
  const response = await fetch(LOG_IN, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: event.target[0].value,
      password: event.target[1].value,
    }), // body data type must match "Content-Type" header
  });
  const results = await response.json();
  //setLoggedIn(results.success);
};

export const LogInPage = () => {
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
