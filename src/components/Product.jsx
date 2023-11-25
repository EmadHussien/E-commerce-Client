import React from "react";
import { styled } from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-with: 280px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e7eee5;
  position: relative;
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;
const Image = styled.img`
  height: 75%;
  z-index: 1;
`;
const Info = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.2);
  height: 100%;
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

export default function Product({ item }) {
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Link
          to={`/product/${item._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Icon>
            <SearchOutlinedIcon />
          </Icon>
        </Link>
      </Info>
    </Container>
  );
}
