import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { Spacer } from "./Layouts/Spacer";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
//const CurrentUserState = require("../lib/CurrentUserState");

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
`;

const ButtonGroup = styled.div`
    display: flex;
    align-content: end
    spacing: 8px;
    height: 32px;
`;

const StyledButton = styled(Button)`
  border: 1px solid #316186 !important;
  color: #316186 !important;
`;

export const Navbar = () => {
  const history = useHistory();
  const setLoggedIn = false;
  return (
    <Wrapper>
      <ButtonGroup>
        <Divider orientation="vertical" flexItem />
        <Spacer width={8} />
        {!setLoggedIn ? (
          <>
            <Button onClick={() => history.push("/login")}>Log in</Button>
            <Spacer width={8} />
            <StyledButton
              onClick={() => history.push("/sign-up")}
              variant="outlined"
            >
              Sign up
            </StyledButton>
            <Spacer width={8} />)
          </>
        ) : (
          <Button onClick={() => history.push("/home")}>Log Out</Button>
        )}
        <StyledButton variant="outlined" onClick={() => history.push("/home")}>
          Demo
        </StyledButton>
        <Spacer width={16} />
      </ButtonGroup>
    </Wrapper>
  );
};
