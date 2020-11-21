import React from 'react';
import {makeAutoObservable} from "mobx";
import {observer} from "mobx-react";
import singletonGetter from "../lib/singletonGetter";
import {Button, Card, Typography, CardContent, Container} from '@material-ui/core';
import styled from 'styled-components';

class ViewState {
    static get = singletonGetter(ViewState)
    counter = 0;
    constructor() {
        makeAutoObservable(this)
    }
    increment = () => ++this.counter;
    decrement = () => --this.counter;
}
const Wrapper = styled(Container).attrs({
    maxWidth: "sm"
})``

const Counter = () => {
    const { counter, increment, decrement } = ViewState.get();
    return (
        <Wrapper>
            <Card>
                <CardContent>
                    <Typography variant="h1" component="h2">
                        { counter }
                    </Typography>
                    <br/>
                    <Button variant="contained" onClick={decrement}>Decrement</Button>
                    <Button variant="contained" onClick={increment}>Increment</Button>
                </CardContent>
            </Card>
        </Wrapper>
    );
};

export default observer(Counter);