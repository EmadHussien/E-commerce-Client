import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fcf5f5;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobile({ fontSize: "65px" })}
`;
const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;
const InputContainer = styled.div`
  background-color: white;
  height: 40px;
  width: 50%;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;
const Input = styled.input`
  border: none;
  padding-left: 20px;
  outline: none;
  flex: 8;
`;
const Button = styled.button`
  flex: 1;
  border: none;
  cursor: pointer;
  background-color: teal;
  color: white;
`;

export default function Newsletter() {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favorite products.</Description>
      <InputContainer>
        <Input placeholder="Enter a valid email address" />
        <Button>
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  );
}
