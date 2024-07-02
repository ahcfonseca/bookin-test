import { useEffect, useState } from "react";
import styled from "styled-components";
import usePlacesStore from "../store/usePlacesStore";
import { BookingModalProps } from "../types/types";
import moment from "moment";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: var(--background-color-light);
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 70%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalTitle = styled.h2`
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalBody = styled.div`
  margin-bottom: 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;

  label {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-weight: 600;

    @media (min-width: 768px) {
      width: 50%;
    }
  }

  input {
    margin-top: 5px;
    height: 35px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 0 0 16px 0;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  border-top: 1px solid #cccccc;
  padding-top: 24px;
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

  &.cancel {
    background-color: #7a7a7a;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background-color: var(--primary-color);
    }
  }
`;

const BookingModal = ({ place, onClose }: BookingModalProps) => {
  const currentBooking = usePlacesStore((state) => state.currentBooking);
  const setCurrentBooking = usePlacesStore((state) => state.setCurrentBooking);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [error, setError] = useState<string>("");
  const addBooking = usePlacesStore((state) => state.addBooking);

  if (!place) return null;

  useEffect(() => {
    if (currentBooking.startDate && currentBooking.endDate) {
      setStartDate(currentBooking.startDate);
      setEndDate(currentBooking.endDate);
    }
  }, [currentBooking]);

  const validateDates = (start: string, end: string) => {
    const startMoment = moment(start);
    const endMoment = moment(end);

    if (startMoment.isAfter(endMoment)) {
      setError("Please select valid dates.");
      return;
    }

    const isDateConflict = place.bookings.some((booking) => {
      const bookingStart = moment(booking.startDate);
      const bookingEnd = moment(booking.endDate);
      return (
        startMoment.isBetween(bookingStart, bookingEnd, null, "[]") ||
        endMoment.isBetween(bookingStart, bookingEnd, null, "[]") ||
        bookingStart.isBetween(startMoment, endMoment, null, "[]") ||
        bookingEnd.isBetween(startMoment, endMoment, null, "[]")
      );
    });

    if (isDateConflict) {
      setError("The selected dates are not available.");
    } else {
      setError("");
    }
  };

  const handleSave = () => {
    if (place && !error) {
      addBooking(place.id, startDate, endDate);
      onClose();
      setCurrentBooking("", "");
    }
  };

  useEffect(() => {
    validateDates(startDate, endDate);
  }, [startDate, endDate]);

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{place.name}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <p>{place.city}</p>
          <p>{place.name}</p>
          <InputWrapper>
            <label>
              Check In:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              Check Out:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
          </InputWrapper>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </ModalBody>
        <ModalFooter>
          <Button className="cancel" onClick={onClose}>
            Cancel
          </Button>
          <Button className="save" onClick={handleSave} disabled={!!error}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BookingModal;
