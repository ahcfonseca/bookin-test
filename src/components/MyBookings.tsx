import styled from "styled-components";
import usePlacesStore from "../store/usePlacesStore";

const Wrapper = styled.div`
  width: 100%;
  padding: 32px 0;
  box-sizing: border-box;
`;

const Title = styled.h2`
  color: var(--white);
  margin-bottom: 24px;
`;

const BookingList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const BookingItem = styled.li`
  background: var(--background-color-light);
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 540px) {
    flex-direction: row;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;

  @media (min-width: 540px) {
    width: 30%;
  }
`;

const BookingDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: 70%;
  }
`;

const PlaceName = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.5em;
  color: var(--text-color);
`;

const BookingDetail = styled.p`
  margin: 0 0 8px 0;
`;

const MyBookings = () => {
  const bookingsWithDetails = usePlacesStore((state) =>
    state.getBookingsByUser(1)
  );

  return (
    <Wrapper>
      <Title>My Bookings</Title>
      <BookingList>
        {bookingsWithDetails.map(({ place, booking }, index) => (
          <BookingItem key={index}>
            <Image src={`./images/${place.image}`} alt={place.name} />
            <BookingDetails>
              <PlaceName>{place.name}</PlaceName>
              <BookingDetail>
                <strong>City:</strong> {place.city}
              </BookingDetail>
              <BookingDetail>
                <strong>Price per night:</strong> ${place.price}
              </BookingDetail>
              <BookingDetail>
                <strong>Beds:</strong> {place.beds}
              </BookingDetail>
              <BookingDetail>
                <strong>Start Date:</strong> {booking.startDate}
              </BookingDetail>
              <BookingDetail>
                <strong>End Date:</strong> {booking.endDate}
              </BookingDetail>
            </BookingDetails>
          </BookingItem>
        ))}
      </BookingList>
    </Wrapper>
  );
};

export default MyBookings;
