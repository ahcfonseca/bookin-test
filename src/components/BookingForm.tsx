import React, { useState } from "react";
import usePlacesStore from "../store/usePlacesStore";
import styled from "styled-components";

type BookingFormProps = {
  onSearch: (city: string, startDate: string, endDate: string) => void;
};

const Wrapper = styled.div`
  width: 100%;
  padding: 32px 0;
  box-sizing: border-box;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 16px;
  background-color: var(--background-color-light);
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: bold;
  width: 100%;

  @media (min-width: 768px) {
    width: 30%;
  }
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  height: 36px;
  align-self: end;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-color-dark);
  }

  @media (min-width: 768px) {
    width: 10%;
  }
`;

const BookingForm = ({ onSearch }: BookingFormProps) => {
  const [city, setCity] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const places = usePlacesStore((state) => state.places);
  const setCurrentBooking = usePlacesStore((state) => state.setCurrentBooking);

  // Create an array with the cities, removing duplicates
  const cities = Array.from(new Set(places.map((place) => place.city)));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentBooking(startDate, endDate);
    onSearch(city, startDate, endDate);
  };
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Label>
          Where
          <Select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">All Cities</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </Select>
        </Label>
        <Label>
          Check In
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Label>
        <Label>
          Check Out
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Label>
        <Button type="submit">Search</Button>
      </Form>
    </Wrapper>
  );
};

export default BookingForm;
