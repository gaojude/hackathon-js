import React from "react";
import {Helmet} from 'react-helmet';
import {IngredientList} from "../components/IngredientList";
import styled from 'styled-components';

const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
`

const ListWrapper = styled.div`
    width: 79%;
`

const ActionBar = styled.div`
    width: 19%;
    background-color: yellow;
`

export const HomePage = () => {
    return <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Home | My Pantry Space</title>
        </Helmet>
        <h1>Home page is live!</h1>
        <StyledRow>
            <ListWrapper>
                <IngredientList />
            </ListWrapper>
            <ActionBar />
        </StyledRow>
    </>}