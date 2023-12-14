import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logOut } from "../redux/userSlice";
import {
  clearCart,
  loadCartFromDB,
  turnOffCartSaving,
} from "../redux/cartSlice";
import useUserRequests from "../Utils/useUserRequests";

const FixedNavbar = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;
//${mobile({ padding: "15px 0" })}
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ display: "none" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ flex: "1", textAlign: "left" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "flex-start" })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 1px solid lightgrey;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "10px" })}
`;
const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "80px" })}
`;
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px", marginLeft: "16px" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const AvatarMenuItem = styled.div`
  font-size: 14px;
  margin-left: 25px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  ${mobile({ fontSize: "12px", marginLeft: "25px" })}
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  margin-left: 20px;
`;

const Accordion = styled.div`
  display: block;
  position: absolute;
  top: 100%;
  right: 10px;
  background-color: #333;
  border: 1px solid #555;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;

  ${mobile({ right: "15px" })}
`;

const Accordionbtn = styled.button`
  display: block;
  color: white;
  padding: 10px;
  text-align: left;
  width: 100%;
  border: none;
  background-color: #333;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;

export default function Navbar() {
  const { userRequests } = useUserRequests();
  const [accordionVisible, setAccordionVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const toggleAccordion = () => {
    setAccordionVisible(!accordionVisible);
  };
  const quantity = useSelector((state) => state.cart.quantity);
  async function loadUserCart() {
    try {
      // dispatch(cartLoaderState(true));
      const res = await userRequests.get(
        `/carts/${user._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(loadCartFromDB(res.data));
      //  dispatch(cartLoaderState(false));
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (cart.products.length < 1 && user) {
      loadUserCart();
    }
  }, []);

  async function updateDbCart() {
    try {
      const res = await userRequests.put(
        `/carts/${cart.cartID}`,
        {
          userID: user._id,
          products: cart.products,
        },
        {
          withCredentials: true,
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (cart.cartID && cart.saveCartInDb === "save" && user) {
      updateDbCart();
      dispatch(turnOffCartSaving());
    }
  }, [cart.saveCartInDb]);

  async function handleLogOut() {
    await Promise.all([
      axios.post(
        "https://e-commerce-backend-two-rouge.vercel.app/logout",
        {},
        {
          withCredentials: true,
        }
      ),
      Promise.resolve(dispatch(logOut())),
      Promise.resolve(dispatch(clearCart())),
    ]);

    // If all promises are resolved, navigate to the login page
    navigate("/login");
    /*  const res = await axios.post(
      "https://e-commerce-backend-two-rouge.vercel.app/logout",
      {},
      {
        withCredentials: true,
      }
    );
    if (res.status === 204) {
      dispatch(clearCart());
      dispatch(logOut());
      navigate("/login");
    } */
  }
  return (
    <FixedNavbar>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="search" />
            <SearchIcon style={{ color: "gray", fontSize: "16px" }} />
          </SearchContainer>
        </Left>

        <Center>
          <Logo>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              e& H. store
            </Link>
          </Logo>
        </Center>

        <Right>
          {!user && (
            <>
              <MenuItem>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  REGISTER
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  SIGN IN
                </Link>
              </MenuItem>
            </>
          )}
          <MenuItem>
            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Badge badgeContent={quantity} color="secondary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </Link>
          </MenuItem>
          {user && (
            <>
              <AvatarMenuItem>
                {user?.username}
                <Avatar
                  src={
                    user?.img ||
                    "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                  }
                  alt="profile"
                  className="nav-avatar"
                  onClick={toggleAccordion}
                />
                {accordionVisible && (
                  <Accordion>
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Accordionbtn onClick={handleLogOut}>Logout</Accordionbtn>
                    </Link>
                  </Accordion>
                )}
              </AvatarMenuItem>
            </>
          )}
        </Right>
      </Wrapper>
    </FixedNavbar>
  );
}
