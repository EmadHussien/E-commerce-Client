import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Navbar from "../components/Navbar";
import Announce from "../components/Announce";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { addProduct } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ flexDirection: "column", padding: "15px" })}
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-size: 35px;
  font-weight: 100;
`;
const FilterContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  cursor: pointer;
  margin: 0px 5px;
  border: 1px solid black;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
  outline: none;
`;
const FilterSizeOption = styled.option``;

const AddContanier = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border: 1px solid teal;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  padding: 12px;
  font-weight: 500;
  background-color: #6b818d;
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #556e7a;
  }
`;

const Remove = styled(RemoveIcon)`
  cursor: pointer;
`;
const Add = styled(AddIcon)`
  cursor: pointer;
`;

export default function Product() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const productID = pathname.split("/")[2];
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [cartErr, setCartErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    const getProduct = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://e-commerce-backend-two-rouge.vercel.app/products/${productID}`
        );
        setProduct(res.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getProduct();
  }, []);

  useEffect(() => {
    if ((size || product?.size.length < 1) && color) {
      setCartErr(false);
    }
  }, [size, color]);

  function handleClick() {
    if ((!size && product?.size.length >= 1) || !color) {
      setCartErr(true);
    } else {
      dispatch(addProduct({ ...product, color, size, quantity }));
    }
  }
  return (
    <Container>
      <Navbar />
      <Announce />
      <Wrapper>
        {isLoading ? (
          <div
            style={{
              height: "60vh",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
            }}
          >
            <CircularProgress style={{ color: "#9BACC4" }} />
          </div>
        ) : (
          <>
            <ImageContainer>
              <Image src={product?.img} />
            </ImageContainer>
            <InfoContainer>
              <Title>{product?.title}</Title>
              <Description>{product?.description} </Description>
              <Price>$ {product?.price}</Price>
              <FilterContainer>
                <Filter>
                  <FilterTitle>Color</FilterTitle>
                  {product?.color.map((proColor) => (
                    <FilterColor
                      color={proColor}
                      key={proColor}
                      onClick={() => setColor(proColor)}
                    />
                  ))}
                </Filter>
                {product?.size.length < 1 ? (
                  ""
                ) : (
                  <Filter>
                    <FilterTitle>Size</FilterTitle>
                    <FilterSize
                      name="size"
                      defaultValue="size"
                      onChange={(e) => setSize(e.target.value)}
                    >
                      <FilterSizeOption disabled>size</FilterSizeOption>
                      {product?.size.map((proSize) => (
                        <FilterSizeOption key={proSize}>
                          {proSize}
                        </FilterSizeOption>
                      ))}
                    </FilterSize>
                  </Filter>
                )}
              </FilterContainer>
              {cartErr && (
                <p style={{ color: "Red", marginBottom: "15px" }}>
                  choose color and size first
                </p>
              )}
              <AddContanier>
                <AmountContainer>
                  <Remove
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  />
                  <Amount>{quantity}</Amount>
                  <Add onClick={() => setQuantity(quantity + 1)} />
                </AmountContainer>
                <Button onClick={handleClick}>ADD TO CART</Button>
              </AddContanier>
            </InfoContainer>
          </>
        )}
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
}
