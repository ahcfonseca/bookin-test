import { useState } from "react";
import styled from "styled-components";

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 32px 0 0;
  padding: 0;
  box-sizing: border-box;
`;

const TabButton = styled.button<{ active: boolean }>`
  font-size: 14px;
  padding: 16px 32px;
  background-color: ${(props) =>
    props.active
      ? "var(--primary-color)"
      : "var(var(--background-color-light))"};
  color: ${(props) => (props.active ? "var(--white)" : "var(--primary-color)")};
  cursor: pointer;
  transition: background-color 0.3s linear;
  border: 0;

  &:hover {
    background-color: ${(props) =>
      props.active ? "var(--primary-color)" : "var(--primary-color-dark)"};
    color: var(--white);
  }

  &:first-child {
    border-radius: 3px 0 0 3px;
  }

  &:last-child {
    border-radius: 0 3px 3px 0;
  }

  @media (min-width: 768px) {
    font-size: 18px;
    padding: 16px 48px;
  }
`;

type TabSwitcherProps = {
  onChangeTab: (tab: string) => void;
};

const TabSwitcher = ({ onChangeTab }: TabSwitcherProps) => {
  const [activeTab, setActiveTab] = useState<string>("available");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onChangeTab(tab);
  };

  return (
    <TabsContainer>
      <TabButton
        active={activeTab === "available"}
        onClick={() => handleTabClick("available")}
      >
        Book a Place
      </TabButton>
      <TabButton
        active={activeTab === "booked"}
        onClick={() => handleTabClick("booked")}
      >
        My Bookings
      </TabButton>
    </TabsContainer>
  );
};

export default TabSwitcher;
