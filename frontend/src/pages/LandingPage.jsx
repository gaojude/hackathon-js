import React from 'react';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';
import TypeIt from "typeit-react";

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 600px;
    background: url("/assets/landing.png") no-repeat;
    background-size: cover;
`

const StyledTypography = styled.h1`
    position: absolute;
    font-size: 64px;
    width: 480px;
    top: 124px;
    left: 40px;
`

export const LandingPage = () => {
    return <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Welcome | My Pantry Space</title>
        </Helmet>
        <Wrapper>
            <StyledTypography>
                Manage Your
                <TypeIt
                    options={{ loop: true }}
                    getBeforeInit={instance => {
                        instance
                            .type("Pantry")
                            .pause(750)
                            .delete(6)
                            .pause(250)
                            .type("Fridge")
                            .pause(750)
                            .delete(6)
                            .pause(250)
                            .type("Recipes")
                            .pause(750)
                            .delete(7)
                            .pause(250)
                            .type("Shopping Lists")
                            .pause(750)
                            .delete(14)
                            .pause(250)
                        // Remember to return it!
                        return instance;
                    }}
                />
                Like a Pro
            </StyledTypography>
        </Wrapper>
    </>
}