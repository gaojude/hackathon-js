import React from 'react';
import {makeAutoObservable} from "mobx";
import {observer} from "mobx-react";
import singletonGetter from "../lib/singletonGetter";
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

import { Button } from '@material-ui/core';
import styled from 'styled-components';
import Typography from "@material-ui/core/Typography";

class ViewState {
    static get = singletonGetter(ViewState)
    counter = 0;
    constructor() {
        makeAutoObservable(this)
    }
    increment = () => ++this.counter;
    decrement = () => --this.counter;
}
const Wrapper = styled.div`
    width: 30%;
`

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
                    <Button variant="contained" onClick={increment}>Increment</Button>
                    <Button variant="contained" onClick={decrement}>Decrement</Button>
                </CardContent>
            </Card>
        </Wrapper>
    );
};

export default observer(Counter);