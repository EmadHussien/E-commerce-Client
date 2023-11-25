import React from "react";
import { styled } from "styled-components";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import RoomIcon from "@mui/icons-material/Room";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Logo = styled.h1``;
const Desc = styled.p`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  color: white;
  cursor: pointer;
`;
const ContactItem = styled.p`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  width: 50%;
`;

export default function Footer() {
  return (
    <Container>
      <Left>
        <Logo>e& H.</Logo>
        <Desc>
          Discover the latest trends and timeless classics in fashion with e& H.
          We're your one-stop destination for stylish clothing that reflects
          your unique style. Experience convenience, quality, and exceptional
          service with every purchase. Elevate your wardrobe today with e& H!.
        </Desc>
        <SocialContainer>
          <SocialIcon bg="#333333">
            <a
              href="https://github.com/EmadHussien"
              target="_blank"
              style={{ textDecoration: "none", color: "inherit" }}
              rel="noreferrer"
            >
              <GitHubIcon />
            </a>
          </SocialIcon>
          <SocialIcon bg="#0077B5">
            <a
              href="https://www.linkedin.com/in/emadhussien98/"
              target="_blank"
              style={{ textDecoration: "none", color: "inherit" }}
              rel="noreferrer"
            >
              <LinkedInIcon />
            </a>
          </SocialIcon>
          <SocialIcon bg="#D44638">
            <a
              href="mailto:emadhussien.fcis@gmail.com"
              target="_blank"
              style={{ textDecoration: "none", color: "inherit" }}
              rel="noreferrer"
            >
              <EmailIcon />
            </a>
          </SocialIcon>
          <SocialIcon bg="#00A79D">
            <a
              href="tel:0111-644-6214"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <PhoneIcon />
            </a>
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>{" "}
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <RoomIcon style={{ marginRight: "10px" }} />
          622 Dixie Path , South Tobinschster 98336
        </ContactItem>
        <ContactItem>
          <PhoneIcon style={{ marginRight: "10px" }} />
          +1 234 56 78
        </ContactItem>
        <ContactItem>
          <EmailIcon style={{ marginRight: "10px" }} />
          emadhussien.fcis@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
}
