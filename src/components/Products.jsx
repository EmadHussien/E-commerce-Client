import React, { useEffect, useState } from "react";
import Product from "./Product";
import { styled } from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-between;
`;

export default function Products({ category, filters, sort }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `https://e-commerce-backend-two-rouge.vercel.app/products?category=${category}`
            : `https://e-commerce-backend-two-rouge.vercel.app/products`
        );
        setProducts(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getProducts();
    sortByNewestDate();
  }, [category]);

  // Sort products by highest price
  const sortByHighestPrice = () => {
    const sortedProducts = [...products].sort(
      (a, b) => parseFloat(b.price) - parseFloat(a.price)
    );
    setProducts(sortedProducts);
  };

  // Sort products by lowest price
  const sortByLowestPrice = () => {
    const sortedProducts = [...products].sort(
      (a, b) => parseFloat(a.price) - parseFloat(b.price)
    );
    setProducts(sortedProducts);
  };
  // Sort products by newest date

  const sortByNewestDate = () => {
    const sortedProducts = [...products].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setProducts(sortedProducts);
  };

  useEffect(() => {
    if (category) {
      if (filters?.color && filters?.size) {
        setFilteredProducts(
          products.filter((product) => {
            return (
              product.color.includes(filters.color) &&
              product.size.includes(filters.size)
            );
          })
        );
      } else if (filters?.color || filters?.size) {
        setFilteredProducts(
          products.filter((product) => {
            return (
              product.color.includes(filters.color) ||
              product.size.includes(filters.size)
            );
          })
        );
      }
    }
  }, [products, category, filters]);

  useEffect(() => {
    if (sort === "newest") {
      sortByNewestDate();
    } else if (sort === "desc") {
      sortByHighestPrice();
    } else if (sort === "asc") {
      sortByLowestPrice();
    }
  }, [sort]);

  return (
    <Container>
      {filteredProducts?.length ? (
        filteredProducts.map((product) => (
          <Product item={product} key={product._id} />
        ))
      ) : filteredProducts?.length === 0 &&
        (filters?.color || filters?.size) ? (
        <h1 style={{ padding: "120px" }}>No Data Found</h1>
      ) : (
        products.map((product) => <Product item={product} key={product._id} />)
      )}
    </Container>
  );
}
