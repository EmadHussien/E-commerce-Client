import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
  height: 30px;
  color: white;
  background-color: teal;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 14px;
`;

export default function Announce() {
  return <Container>Super Deal! Free Shipping on Orders Over 50$</Container>;
}
