import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logOut } from "../redux/userSlice";
import { loadCartFromDB } from "../redux/cartSlice";
import useUserRequests from "../Utils/useUserRequests";
const Container = styled.div`
  height: 60px;
  ${mobile({ height: "40px", marginBottom: "16px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "15px 0" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ display: "none" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ flex: "1.5" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "flex-start", flex: 2 })}
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

export default function Navbar() {
  const { userRequests } = useUserRequests();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);

  const quantity = useSelector((state) => state.cart.quantity);
  async function loadUserCart() {
    try {
      const res = await userRequests.get(
        `/carts/${user._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(loadCartFromDB(res.data));
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (cart.products.length < 1 && user) {
      loadUserCart();
    }
  }, []);

  async function handleLogOut() {
    const res = await axios.post(
      "https://e-commerce-backend-two-rouge.vercel.app/logout",
      {},
      {
        withCredentials: true,
      }
    );
    if (res.status === 204) {
      dispatch(logOut());
    }
  }
  return (
    <Container>
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
          {user && (
            <>
              <MenuItem>Welcome {user?.username}</MenuItem>
              <MenuItem>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={handleLogOut}
                >
                  Log out
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
        </Right>
      </Wrapper>
    </Container>
  );
}
