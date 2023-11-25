import React from "react";
import CategoryItem from "./CategoryItem";
import { styled } from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px", flexDirection: "column" })}
`;

export default function Categories() {
  return (
    <Container>
      {categories.map((category) => (
        <CategoryItem item={category} key={category.id} />
      ))}
    </Container>
  );
}
