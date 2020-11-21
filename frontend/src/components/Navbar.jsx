import React from 'react';
import styled from 'styled-components'
import Button from "@material-ui/core/Button";
import {Spacer} from "./Layouts/Spacer";
import Divider from "@material-ui/core/Divider";

const Wrapper = styled.div`
    width: 100%;
    height: 64px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: flex-end;
: 
`

const ButtonGroup = styled.div`
    display: flex;
    align-content: end
    spacing: 8px;
    height: 32px;
`

const StyledButton = styled(Button)`
    border: 1px solid #316186 !important;
    color: #316186 !important;
`

export const Navbar = () =>
    <Wrapper>
        <ButtonGroup>
            <Divider orientation="vertical" flexItem/>
            <Spacer width={8}/>
            <Button>Log in</Button>
            <Spacer width={8}/>
            <StyledButton variant="outlined">Sign up</StyledButton>
            <Spacer width={8}/>
            <StyledButton variant="outlined">Demo</StyledButton>
            <Spacer width={16}/>
        </ButtonGroup>
    </Wrapper>
