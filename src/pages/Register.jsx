import React, { useState } from "react";
import { styled } from "styled-components";
import { mobile } from "../responsive";
import axios from "axios";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img.freepik.com/free-photo/portrait-excited-hopeful-blond-girl-making-wish-crossed-fingers-good-luck-close-eyes-smiling-putting-all-effort-into-pray-pleading-dream-come-true-anticipating-pink-background_1258-92901.jpg?w=1060&t=st=1694064203~exp=1694064803~hmac=5ed8ec4f4424b24769400953348a548195ed34b9ef066e3b8de20a81cf4a0b87")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ backgroundPosition: "80%" })}
`;

const Wrapper = styled.div`
  width: 40%;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  ${mobile({ width: "80%" })}
`;
const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
  font-family: monospace;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;
const Button = styled.button`
  padding: 15px 12px;
  font-weight: 500;
  background-color: teal;
  border: none;
  color: white;
  cursor: pointer;
  width: 40%;
  &:hover {
    background-color: lightseagreen;
  }
  ${mobile({ padding: "10px" })}
`;

export default function Register() {
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmedPwd: "",
  });

  async function RegisterNewUser() {
    try {
      const { confirmedPwd, ...userData } = user;

      const res = await axios.post(
        "https://e-commerce-backend-two-rouge.vercel.app/auth/register",
        userData
      );
      if (res.status === 201) {
        setMsg(
          "Registration completed! Please sign in to access your account."
        );
      }
    } catch (error) {
      if (error.response.status === 409 || error.response.status === 500) {
        setMsg("Username or Email is already taken");
      }
    }
  }

  function handleClick(e) {
    e.preventDefault();
    if (user.password !== user.confirmedPwd) {
      setMsg("Please Provide Matching Passwords");
    } else {
      setMsg("");
      RegisterNewUser();
    }
  }
  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleClick}>
          <Input
            placeholder="first name"
            onChange={handleChange}
            name="firstname"
            required
            value={user.firstname}
          />
          <Input
            placeholder="last name"
            required
            onChange={handleChange}
            name="lastname"
            value={user.lastname}
          />
          <Input
            placeholder="username"
            onChange={handleChange}
            name="username"
            value={user.username}
            required
          />
          <Input
            placeholder="email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={user.email}
          />
          <Input
            placeholder="password"
            autoComplete="off"
            onChange={handleChange}
            name="password"
            value={user.password}
            required
            type="password"
          />
          <Input
            type="password"
            placeholder="confirm password"
            onChange={handleChange}
            name="confirmedPwd"
            value={user.confirmedPwd}
            required
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
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
          <Button type="submit">Register</Button>
        </Form>
      </Wrapper>
    </Container>
  );
}
