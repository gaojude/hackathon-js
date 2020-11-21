import React from 'react';
import {makeAutoObservable} from "mobx";
import {observer} from "mobx-react";
import singletonGetter from "../lib/singletonGetter";
import {Button, Card, Typography, CardContent, Container} from '@material-ui/core';

class ViewState {
    static get = singletonGetter(ViewState)
    counter = 0;

    constructor() {
        makeAutoObservable(this)
    }

    increment = () => ++this.counter;
    decrement = () => --this.counter;
}

const Counter = () => {
    const {counter, increment, decrement} = ViewState.get();
    return (
        <Container maxWidth={"sm"}>
            <Card>
                <CardContent>
                    <Typography variant="h1" component="h2">
                        {counter}
                    </Typography>
                    <br/>
                    <Button variant="contained" onClick={decrement}>Decrement</Button>
                    <Button variant="contained" onClick={increment}>Increment</Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default observer(Counter);