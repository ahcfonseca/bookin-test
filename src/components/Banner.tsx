import styled from "styled-components";
import defaultBanner from "../assets/images/default-banner.jpg";

const BannerContainer = styled.div`
  background-image: url(${defaultBanner});
  background-size: cover;
  background-position: center;
  padding: 50px 20px;
  text-align: center;
  color: white;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  & > * {
    position: relative;
    z-index: 2;
  }

  h2 {
    font-size: 52px;
    font-weight: 900;
    margin-block-end: 0;
  }

  p {
    font-weight: 400;
    font-size: 20px;
    margin-block-start: 0;
  }
`;

const Banner = () => {
  return (
    <BannerContainer>
      <h2>Welcome to Bookin</h2>
      <p>Discover, book, explore!</p>
    </BannerContainer>
  );
};

export default Banner;
