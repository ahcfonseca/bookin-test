import styled from "styled-components";
import usePlacesStore from "../store/usePlacesStore";

const Wrapper = styled.div`
  width: 100%;
  padding: 32px 0;
  box-sizing: border-box;
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
`;

const BookingDetail = styled.p`
  margin: 0 0 8px 0;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 8px;
`;

const MyBookings = () => {
  const bookingsWithDetails = usePlacesStore((state) =>
    state.getBookingsByUser(1)
  );

  return (
    <Wrapper>
      <h2>My Bookings</h2>
      <BookingList>
        {bookingsWithDetails.map(({ place, booking }, index) => (
          <BookingItem key={index}>
            <Image src={`./images/${place.image}`} alt={place.name} />
            <BookingDetail>
              <strong>City:</strong> {place.city}
            </BookingDetail>
            <BookingDetail>
              <strong>Place:</strong> {place.name}
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
          </BookingItem>
        ))}
      </BookingList>
    </Wrapper>
  );
};

export default MyBookings;
