import React from 'react';
import styled from 'styled-components'
import Button from "@material-ui/core/Button";
import {Spacer} from "./Layouts/Spacer";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 64px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 1;
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

export const Navbar = () => {
    const history = useHistory();

    return <Wrapper>
        <ButtonGroup>
            <Divider orientation="vertical" flexItem/>
            <Spacer width={8}/>
            <Button>Log in</Button>
            <Spacer width={8}/>
            <StyledButton variant="outlined">Sign up</StyledButton>
            <Spacer width={8}/>
            <StyledButton variant="outlined" onClick={() => history.push('/home')}>Demo</StyledButton>
            <Spacer width={16}/>
        </ButtonGroup>
    </Wrapper>
}