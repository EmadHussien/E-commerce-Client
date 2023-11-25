import { styled } from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 80vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  ${mobile({ display: "none" })}
`;

const Wrapper = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 20px 0px;
  display: flex;
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

export default function Slider() {
  return (
    <Container>
      <Wrapper>
        <Slide bg={"fcf1ed"}>
          <ImgContainer>
            <Image
              src={
                "https://img.freepik.com/free-photo/positive-woman-red-beret-trendy-blouse-smiles-holds-bags-from-clothing-stores_197531-17592.jpg?w=1200&t=st=1700931572~exp=1700932172~hmac=6702074ad8244d2daef0c22645fb5ac9a9b9b9a585b9d6c361ae8d3f492a0f34"
              }
            />
          </ImgContainer>
          <InfoContainer>
            <Title>SUMMER SALE</Title>
            <Description>
              DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.
            </Description>
          </InfoContainer>
        </Slide>
      </Wrapper>
    </Container>
  );
}
