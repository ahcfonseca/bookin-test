import { useEffect, useState } from "react";
import styled from "styled-components";
import usePlacesStore from "../store/usePlacesStore";
import { BookingModalProps } from "../types/types";

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

    @media (min-width: 768px) {
      width: 50%;
    }
  }

  input {
    height: 35px;
  }
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
`;

const BookingModal = ({ place, onClose }: BookingModalProps) => {
  const currentBooking = usePlacesStore((state) => state.currentBooking);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const addBooking = usePlacesStore((state) => state.addBooking);

  useEffect(() => {
    if (currentBooking.startDate && currentBooking.endDate) {
      setStartDate(currentBooking.startDate);
      setEndDate(currentBooking.endDate);
    }
  }, [currentBooking]);

  const handleSave = () => {
    if (place) {
      addBooking(place.id, startDate, endDate);
    }
    onClose();
  };

  if (!place) return null;

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
        </ModalBody>
        <ModalFooter>
          <Button className="cancel" onClick={onClose}>
            Cancel
          </Button>
          <Button className="save" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BookingModal;
