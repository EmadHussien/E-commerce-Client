import React from "react";
import { styled } from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  ${mobile({ margin: " 5px 0" })}
`;
const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  ${mobile({ height: "40vh" })}
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;
const Button = styled.button`
  border: none;
  color: gray;
  background-color: white;
  padding: 10px;
  cursor: pointer;
  font-weight: 600;
`;

export default function CategoryItem({ item }) {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Link to={`/products/${item.category}`}>
          <Button>SHOP NOW</Button>
        </Link>
      </Info>
    </Container>
  );
}
