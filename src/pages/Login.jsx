import React, { useState } from "react";
import { styled } from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img.freepik.com/free-photo/shopping-discounts-concept-young-stylish-modern-girl-posing-with-credit-card-looking-happy-s_1258-120032.jpg?w=1060&t=st=1694064130~exp=1694064730~hmac=66ab83ac5114477cf92eab9a4f28168981d811928fe6930476b20a616e6078e2")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ backgroundPosition: "80%" })}
`;

const Wrapper = styled.div`
  width: 25%;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  font-family: monospace;
`;

const Button = styled.button`
  margin: 12px 0;
  padding: 10px;
  font-weight: 500;
  background-color: teal;
  border: none;
  color: white;
  cursor: pointer;
  width: 30%;
  &:hover {
    background-color: lightseagreen;
  }
`;
const AnchorLink = styled.p`
  font-size: 12px;
  margin: 5px 0px;
  text-decoration: underline;
  cursor: pointer;
`;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  async function Login() {
    try {
      const res = await axios.post(
        "https://e-commerce-backend-two-rouge.vercel.app/auth/login",
        user,
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setMsg("");
        dispatch(addUser({ ...res.data }));
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        setMsg(
          "Login failed. Please double check your credentials and try again."
        );
      }
    }
  }

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    Login();
  }
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="username"
            onChange={handleChange}
            name="username"
            value={user.username}
            required
          />
          <Input
            placeholder="password"
            onChange={handleChange}
            name="password"
            value={user.password}
            required
            type="password"
          />
          <Button>LOGIN</Button>
          <p
            style={{
              color: "red",
              marginBottom: "20px",
              width: "80%",
              fontSize: "14px",
            }}
          >
            {msg}
          </p>
          <AnchorLink>DO NOT YOU REMEMBER THE PASSWORD?</AnchorLink>
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <AnchorLink>CREATE A NEW ACCOUNT</AnchorLink>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
}
