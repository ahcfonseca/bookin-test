import { styled } from "styled-components";

const FooterContainer = styled.footer`
  background-color: #699bf7;
  text-align: center;
  padding-block: 16px;

  span {
    font-size: 12px;
    color: #000;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <span>Bookin Inc - All Rights Reserved</span>
    </FooterContainer>
  );
}

export default Footer;
