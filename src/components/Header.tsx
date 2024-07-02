import styled from "styled-components";
import logo from "../assets/images/logo.png";

const HeaderContainer = styled.header`
  background-color: #699bf7;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  height: 50px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo src={logo} alt="Logo" />
    </HeaderContainer>
  );
};

export default Header;
