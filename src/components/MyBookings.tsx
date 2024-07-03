import styled from "styled-components";
import usePlacesStore from "../store/usePlacesStore";
import { useState } from "react";
import BookingModal from "./BookingModal";
import { Booking, Place } from "../types/types";

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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
`;

const EditButton = styled.button`
  padding: 10px;
  background-color: var(--primary-color);
  min-width: 50px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-color-dark);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background-color: var(--primary-color);
    }
  }
`;

const DeleteButton = styled.button`
  padding: 10px;
  min-width: 50px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkred;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background-color: red;
    }
  }
`;

const NoResultsMessage = styled.h4`
  color: var(--white);
`;

const MyBookings = () => {
  const myBookings = usePlacesStore(
    (state) => state.getBookingsByUser(1) // passing the ID one because that's the only user for now
  );
  const deleteBooking = usePlacesStore((state) => state.deleteBooking);

  // here we set the booking we want to edit
  const [selectedBooking, setSelectedBooking] = useState<{
    place: Place;
    booking: Booking;
  } | null>(null);

  const handleDelete = (placeId: number, bookingId: number) => {
    deleteBooking(placeId, bookingId);
  };

  return (
    <Wrapper>
      <Title>My Bookings</Title>
      {myBookings.length === 0 && (
        <BookingList>
          <NoResultsMessage>You don't have any bookings</NoResultsMessage>
        </BookingList>
      )}
      {myBookings.length > 0 && (
        <BookingList>
          {myBookings.map(({ place, booking }, index) => (
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
                  <strong>Check In:</strong> {booking.startDate}
                </BookingDetail>
                <BookingDetail>
                  <strong>Check Out:</strong> {booking.endDate}
                </BookingDetail>
                <ButtonGroup>
                  <DeleteButton
                    onClick={() => handleDelete(place.id, booking.id)}
                  >
                    Delete
                  </DeleteButton>
                  <EditButton
                    onClick={() => setSelectedBooking({ place, booking })}
                  >
                    Edit
                  </EditButton>
                </ButtonGroup>
              </BookingDetails>
            </BookingItem>
          ))}
        </BookingList>
      )}
      {selectedBooking && (
        <BookingModal
          place={selectedBooking.place}
          booking={selectedBooking.booking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </Wrapper>
  );
};

export default MyBookings;
