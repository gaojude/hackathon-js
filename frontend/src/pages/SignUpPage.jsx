import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { Helmet } from 'react-helmet';
const { SIGN_UP } = require('../consts/constants');
const SignUpRequest = async (event) => { 
    event.preventDefault();
    const response = await fetch(SIGN_UP, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: event.target[0].value, email: event.target[1].value, password: event.target[2].value }) // body data type must match "Content-Type" header
    });
    const results = await response.json()
}

export const SignUpPage = () => {
    return <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>mypantry.space - Sign Up</title>
        </Helmet>
        <h1>mypantry.space - Sign Up</h1>
        <form noValidate autoComplete="off" onSubmit={async (event) => { await SignUpRequest(event); }}>
            <TextField id="name" label="Name" />
            <TextField id="email" label="Email" />
  <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
            />
            <Button  type="submit" >Sign Up!</Button>
</form>
    </>
}