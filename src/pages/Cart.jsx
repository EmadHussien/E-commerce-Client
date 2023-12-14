import React, { Fragment, useEffect, useState } from "react";
import { styled } from "styled-components";
import Navbar from "../components/Navbar";
import Announce from "../components/Announce";
import Footer from "../components/Footer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseProductQuantity,
  increaseProductQuantity,
  clearCart,
  clearCartAfterPayment,
} from "../redux/cartSlice";
import useUserRequests from "../Utils/useUserRequests";
import StripeCheckout from "react-stripe-checkout";
import CircularProgress from "@mui/material/CircularProgress";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  text-align: center;
  font-weight: 300;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  ${mobile({ padding: "10px 0px", margin: "10px 0" })}
`;
const TopButton = styled.button`
  padding: 20px;
  cursor: pointer;
  border: ${(props) => (props.type === "filled" ? "none" : "1px solid teal")};
  color: ${(props) => (props.type === "filled" ? "white" : "teal")};
  background-color: ${(props) =>
    props.type === "filled" ? "teal" : "transparent"};
  &:hover {
    background-color: ${(props) =>
      props.type === "filled" ? "lightseagreen" : " #f0f0f0"};
  }
  &:active {
    background-color: ${(props) =>
      props.type === "filled" ? "teal" : " white"};
  }
  ${mobile({ padding: "10px" })}
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const Bottom = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetails = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ flexDirection: "column" })}
`;
const ProductName = styled.span`
  ${mobile({ fontSize: "16px" })}
`;
const ProductId = styled.span`
  ${mobile({ fontSize: "10px" })}
`;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;
const PriceDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mobile({ marginBottom: "10px" })}
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin-bottom: 20px;
  ${mobile({ marginTop: "20px" })}
`;
const ProductAmount = styled.span`
  width: 30px;
  height: 30px;
  border: 1px solid teal;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  ${mobile({ width: "40px", height: "40px", margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 500;
`;

const Remove = styled(RemoveIcon)`
  cursor: pointer;
`;
const Add = styled(AddIcon)`
  cursor: pointer;
`;
const HR = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 10px 0;
`;

const Summary = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  margin-left: 10px;
  ${mobile({ margin: "20px 10px" })}
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 15px;
  cursor: pointer;
  border: none;
  color: white;
  background-color: #6b818d;
  &:hover {
    background-color: #556e7a;
  }
  &:active {
    background-color: #6b818d;
  }
`;
const DisabledButton = styled(Button)`
  background-color: lightgray;
  &:hover {
    background-color: lightgray;
  }
`;

export default function Cart() {
  const { userRequests } = useUserRequests();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user?.currentUser);
  const cartView = [];
  const [stripeToken, setStripeToken] = useState(null);
  const [paymentSucceeded, setPaymentSucceeded] = useState("NO STATE");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  async function makePayment() {
    const products = cartView.map((item) => {
      return {
        productID: item._id,
        quantity: item.quantity,
      };
    });
    const address = `${stripeToken?.card.address_line1} ${stripeToken?.card.address_city} ${stripeToken?.card.address_country}`;

    try {
      const res = await userRequests.post(
        "/checkout/payment",
        {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
          products,
          address,
          username: user.username,
          img: user.img || "",
        },
        {
          withCredentials: true,
        }
      );
      dispatch(clearCartAfterPayment());
      setPaymentSucceeded("Successed");
      // clear cart
      // show message of success
      // disable checkout btn
    } catch (e) {
      // show message of failure
      setPaymentSucceeded("Failed");
    }
  }

  function onToken(token) {
    setStripeToken(token);
  }

  useEffect(() => {
    if (stripeToken) {
      makePayment();
    }
  }, [stripeToken]);

  for (let i = 0; i < cart.products.length; i++) {
    const product = cart.products[i];

    const index = cartView.findIndex(
      (p) =>
        p._id === product._id &&
        p.color === product.color &&
        p.size === product.size
    );

    if (index !== -1) {
      const productCopy = { ...cartView[index] };
      productCopy.quantity += product.quantity;
      cartView[index] = productCopy;
    } else {
      cartView.push(product);
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <StripeCheckout
            name="e& H. Shop"
            image="https://i.ibb.co/y6hNFzr/e-H.png"
            billingAddress
            shippingAddress
            description={`your total is ${cart.total}`}
            amount={cart.total * 100}
            token={onToken}
            stripeKey={process.env.REACT_APP_STRIPE}
          >
            {cart.total > 0 && user ? (
              <Button>CHECKOUT NOW</Button>
            ) : (
              <DisabledButton disabled>CHECKOUT NOW</DisabledButton>
            )}
          </StripeCheckout>
        </Top>
        <Bottom
          style={{
            height: cart.loadFromDb && "60vh",
            justifyContent: cart.loadFromDb && "center",
            alignItems: cart.loadFromDb && "center",
          }}
        >
          {cart.loadFromDb ? (
            <CircularProgress style={{ color: "#9BACC4" }} />
          ) : (
            <>
              <Info>
                {paymentSucceeded === "Successed" && (
                  <div
                    style={{
                      display: "flex",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h3 style={{ color: "green" }}>
                      Success! Your payment is confirmed, and your order is on
                      its way.
                    </h3>
                  </div>
                )}
                {paymentSucceeded === "Failed" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "20px",
                    }}
                  >
                    <h3 style={{ color: "Red" }}>
                      Payment failed! We have an issue right now, try again
                      later.
                    </h3>
                  </div>
                )}
                {cartView.map((product, index) => (
                  <Fragment key={index}>
                    <Product key={product._id + product.color + product.size}>
                      <ProductDetails>
                        <Image src={product.img} />
                        <Details>
                          <ProductName>
                            <b>Product:</b> {product.title}
                          </ProductName>
                          <ProductId>
                            <b>ID:</b> {product._id}
                          </ProductId>
                          <ProductColor color={product.color} />
                          <ProductSize>
                            <b>Size:</b> {product.size}
                          </ProductSize>
                        </Details>
                      </ProductDetails>
                      <PriceDetails>
                        <ProductAmountContainer>
                          <Remove
                            onClick={() =>
                              dispatch(
                                decreaseProductQuantity({
                                  id: product._id,
                                  color: product.color,
                                  size: product.size,
                                })
                              )
                            }
                          />
                          <ProductAmount>{product.quantity}</ProductAmount>
                          <Add
                            onClick={() =>
                              dispatch(
                                increaseProductQuantity({
                                  id: product._id,
                                  color: product.color,
                                  size: product.size,
                                })
                              )
                            }
                          />
                        </ProductAmountContainer>
                        <ProductPrice>$ {product.price}</ProductPrice>
                      </PriceDetails>
                    </Product>
                    <HR key={index} />
                  </Fragment>
                ))}
              </Info>
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal </SummaryItemText>
                  <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping </SummaryItemText>
                  <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount </SummaryItemText>
                  <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                </SummaryItem>
                <HR />
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                </SummaryItem>

                <StripeCheckout
                  name="e& H. Shop"
                  image="https://i.ibb.co/y6hNFzr/e-H.png"
                  billingAddress
                  shippingAddress
                  description={`your total is ${cart.total}`}
                  amount={cart.total * 100}
                  token={onToken}
                  stripeKey={process.env.REACT_APP_STRIPE}
                >
                  {cart.total > 0 && user ? (
                    <Button>CHECKOUT NOW</Button>
                  ) : (
                    <DisabledButton disabled>CHECKOUT NOW</DisabledButton>
                  )}
                </StripeCheckout>
              </Summary>
            </>
          )}
        </Bottom>
      </Wrapper>
    </Container>
  );
}
