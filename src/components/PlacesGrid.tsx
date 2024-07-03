import { Place } from "../types/types";
import PlacesCard from "./PlacesCard";
import styled from "styled-components";

export type PlacesGridProps = {
  places: Place[];
  currentCity: string;
};

const GridWrapper = styled.div`
  display: grid;
  gap: 16px;
  padding: 16px 0 48px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Title = styled.h3`
  color: var(--white);
`;

const PlacesGrid = ({ places, currentCity }: PlacesGridProps) => {
  const resultsCount = places.length;
  const text = resultsCount === 1 ? "result" : "results";
  const location = currentCity === "" ? "the entire universe" : currentCity;

  return (
    <>
      <Title>{`Showing ${resultsCount} ${text} in ${location}`}</Title>
      <GridWrapper>
        {places.map((place) => (
          <PlacesCard key={place.id} place={place} />
        ))}
      </GridWrapper>
    </>
  );
};

export default PlacesGrid;
