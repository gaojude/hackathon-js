import React from 'react';
import {makeAutoObservable} from "mobx";
import {observer} from "mobx-react";
import singletonGetter from "../lib/singletonGetter";

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
    const { counter, increment, decrement } = ViewState.get();
    return (
        <div>
            { counter }
            <br/>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

export default observer(Counter);