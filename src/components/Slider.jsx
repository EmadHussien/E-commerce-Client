import React, { useState } from "react";
import { styled } from "styled-components";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  ${mobile({ display: "none" })}
`;
const Arrow = styled.div`
  height: 50px;
  width: 50px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  opacity: 0.5;
  z-index: 1;
`;
const Wrapper = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 20px 0px;
  display: flex;
  transform: translateX(${(props) => -props.slidepage}vw);
  transition: all 1.5s ease;
`;
const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;
const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;
const Image = styled.img`
  height: 80%;
`;
const InfoContainer = styled.div`
  flex: 1;
  box-sizing: border-box;
  padding: 50px;
`;
const Title = styled.h1`
  font-size: 70px;
`;
const Description = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  font-size: 20px;
  background-color: transparent;
`;

export default function Slider() {
  const [sliderpage, setSliderPage] = useState(0);

  function handleClick(direction) {
    if (direction === "left") {
      if (sliderpage === 0) {
        setSliderPage(200);
        return;
      }
      setSliderPage((prevState) => prevState - 100);
    } else if (direction === "right") {
      if (sliderpage >= 200) {
        setSliderPage(0);
        return;
      }
      setSliderPage((prevState) => prevState + 100);
    }
  }
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowBackIosOutlinedIcon />
      </Arrow>
      <Wrapper slidepage={sliderpage}>
        {sliderItems.map((sliderItem) => {
          return (
            <Slide bg={sliderItem.bg} key={sliderItem.id}>
              <ImgContainer>
                <Image src={sliderItem.img} />
              </ImgContainer>
              <InfoContainer>
                <Title>{sliderItem.title}</Title>
                <Description>{sliderItem.desc}</Description>
                <Button>SHOP NOW</Button>
              </InfoContainer>
            </Slide>
          );
        })}
      </Wrapper>

      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowForwardIosOutlinedIcon />
      </Arrow>
    </Container>
  );
}
