import { useState } from "react";
import styled from "styled-components";
import BookingModal from "./BookingModal";
import { Place } from "../types/types";

export type PlacesCardProps = {
  place: Place;
};

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  text-align: left;
  background-color: var(--background-color-light);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
    transform: scale(1.02);
  }

  img {
    max-width: 100%;
    border-radius: 4px;
    object-fit: cover;
    max-height: 130px;
    width: 100%;

    @media (min-width: 768px) {
      max-height: 220px;
      height: 50%;
    }
  }

  h3 {
    margin: 8px 0;
    color: var(--text-color);
  }

  p {
    margin: 4px 0;
    color: var(--text-color);
  }

  span {
    margin-top: 12px;
    display: inline-block;
  }
`;

const PlacesCard = ({ place }: PlacesCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const bedLabel = place.beds === 1 ? "bed" : "beds";

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card onClick={handleCardClick}>
        <img src={`./images/${place.image}`} alt={place.name} />
        <h3>{place.name}</h3>
        <p>{place.city}</p>
        <p>{`${place.beds} ${bedLabel}`}</p>
        <span>
          <strong>{`$${place.price} USD `}</strong>night
        </span>
      </Card>
      {isModalOpen && <BookingModal place={place} onClose={handleCloseModal} />}
    </>
  );
};

export default PlacesCard;
