export type Booking = {
  id: number;
  userId: number;
  startDate: string;
  endDate: string;
};

export type Place = {
  id: number;
  city: string;
  name: string;
  image: string;
  price: number;
  beds: number;
  bookings: Booking[];
};

export type PlacesState = {
  places: Place[];
  addBooking: (placeId: number, startDate: string, endDate: string) => void;
  updateBooking: (
    placeId: number,
    bookingId: number,
    startDate: string,
    endDate: string
  ) => void;
  deleteBooking: (placeId: number, bookingId: number) => void;
  currentBooking: { id?: number; startDate: string; endDate: string };
  setCurrentBooking: (
    id: number | undefined,
    startDate: string,
    endDate: string
  ) => void;
  getBookingsByUser: (userId: number) => { place: Place; booking: Booking }[];
  getAvailablePlaces: (
    city: string,
    startDate: string,
    endDate: string
  ) => Place[];
};

export type BookingModalProps = {
  booking?: Booking | null;
  place: Place | null;
  onClose: () => void;
};

export type PlacesCardProps = {
  place: Place;
};

export type PlacesGridProps = {
  places: Place[];
  currentCity: string;
};

export type Dates = {
  startDate: string;
  endDate: string;
};
