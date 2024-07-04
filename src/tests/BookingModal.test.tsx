import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookingModal from "../components/BookingModal";
const { expect, describe } = require("@jest/globals");

jest.mock("../store/usePlacesStore");

const mockOnClose = jest.fn();
const mockAddBooking = jest.fn();
const mockUpdateBooking = jest.fn();

const mockPlace = {
  id: 1,
  city: "New York",
  name: "Cozy Apartment in Manhattan",
  image: "new-york-1.webp",
  price: 127,
  beds: 1,
  bookings: [
    { id: 1, userId: 1, startDate: "2024-07-10", endDate: "2024-07-12" },
  ],
};

describe("BookingModal", () => {
  test("renders correctly with no booking", () => {
    render(
      <BookingModal place={mockPlace} booking={null} onClose={mockOnClose} />
    );

    expect(
      screen.getByText(/Cozy Apartment in Manhattan/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/check in/i)).toHaveValue("");
    expect(screen.getByLabelText(/check out/i)).toHaveValue("");
    expect(screen.getByText(/save/i)).toBeDisabled();
  });

  test("renders correctly with existing booking", () => {
    const existingBooking = {
      id: 1,
      userId: 1,
      startDate: "2024-07-10",
      endDate: "2024-07-12",
    };

    render(
      <BookingModal
        place={mockPlace}
        booking={existingBooking}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByLabelText(/check in/i)).toHaveValue("2024-07-10");
    expect(screen.getByLabelText(/check out/i)).toHaveValue("2024-07-12");
    expect(screen.getByText(/save/i)).toBeEnabled();
  });

  test("validates date inputs and shows error messages", () => {
    render(
      <BookingModal place={mockPlace} booking={null} onClose={mockOnClose} />
    );

    const checkInInput = screen.getByLabelText(/check in/i);
    const checkOutInput = screen.getByLabelText(/check out/i);
    const saveButton = screen.getByText(/save/i);

    fireEvent.change(checkInInput, { target: { value: "2024-07-11" } });
    fireEvent.change(checkOutInput, { target: { value: "2024-07-10" } });

    expect(screen.getByText("Please select valid dates.")).toBeInTheDocument();
    expect(saveButton).toBeDisabled();
  });

  test("adds a new booking on save", async () => {
    render(
      <BookingModal place={mockPlace} booking={null} onClose={mockOnClose} />
    );

    const checkInInput = screen.getByLabelText(/check in/i);
    const checkOutInput = screen.getByLabelText(/check out/i);
    const saveButton = screen.getByText(/save/i);

    fireEvent.change(checkInInput, { target: { value: "2024-07-13" } });
    fireEvent.change(checkOutInput, { target: { value: "2024-07-14" } });

    expect(saveButton).toBeEnabled();

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockAddBooking).toHaveBeenCalledWith(
        1,
        "2024-07-13",
        "2024-07-14"
      );
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  test("updates an existing booking on save", async () => {
    const existingBooking = {
      id: 1,
      userId: 1,
      startDate: "2024-07-10",
      endDate: "2024-07-12",
    };

    render(
      <BookingModal
        place={mockPlace}
        booking={existingBooking}
        onClose={mockOnClose}
      />
    );

    const checkInInput = screen.getByLabelText(/check in/i);
    const checkOutInput = screen.getByLabelText(/check out/i);
    const saveButton = screen.getByText(/save/i);

    fireEvent.change(checkInInput, { target: { value: "2024-07-13" } });
    fireEvent.change(checkOutInput, { target: { value: "2024-07-14" } });

    expect(saveButton).toBeEnabled();

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockUpdateBooking).toHaveBeenCalledWith(
        1,
        1,
        "2024-07-13",
        "2024-07-14"
      );
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
