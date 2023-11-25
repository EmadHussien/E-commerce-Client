import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Announce from "../components/Announce";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ display: "flex", flexDirection: "column", margin: "5px 20px" })}
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ fontSize: "18px" })}
`;
const Select = styled.select`
  outline: none;
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option`
  padding: 10px;
`;

export default function ProductList() {
  const { pathname } = useLocation();
  const category = pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  function handleFilters(e) {
    const value = e.target.value;
    setFilters({ ...filters, [e.target.name]: value });
  }

  return (
    <Container>
      <Navbar />
      <Announce />
      <Title>{category.toUpperCase()}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>

          <Select name="color" defaultValue={"Color"} onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
            <Option>Brown</Option>
          </Select>
          <Select name="size" defaultValue={"Size"} onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>SM</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products: </FilterText>

          <Select
            onChange={(e) => setSort(e.target.value)}
            defaultValue={"Sort"}
          >
            <Option disabled>Sort</Option>
            <Option value="newest">Newest</Option>
            <Option value="desc">Price (Highest)</Option>
            <Option value="asc">Price (Lowest)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
}
