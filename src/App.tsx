import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Banner from "./components/Banner";
import GlobalStyles from "./styles/GlobalStyles";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding-inline: 16px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    max-width: 1600px;
    margin: 0 auto;
    width: 100%;
  }
`;

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <Banner />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
};

export default App;
