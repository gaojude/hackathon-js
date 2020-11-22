import React from "react";
import { Button, TextField } from "@material-ui/core";
import { Helmet } from "react-helmet";
import CurrentUserState from "../lib/CurrentUserState";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { SIGN_UP } from "../consts/constants";

const SignUpPage = () => {
  const history = useHistory();
  const SignUpRequest = async (event) => {
    event.preventDefault();
    const { setLoggedIn } = CurrentUserState.get();
    const response = await fetch(SIGN_UP, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: event.target[0].value,
        email: event.target[1].value,
        password: event.target[2].value,
      }), // body data type must match "Content-Type" header
    });
    const results = await response.json();
    setLoggedIn(results.success, results._id);
    if (results.success) {
      history.push("/");
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
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
        <TextField id="name" label="Name" />
        <TextField id="email" label="Email" />
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
