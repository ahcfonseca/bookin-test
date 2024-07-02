export type Booking = {
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
  currentBooking: { startDate: string; endDate: string };
  setCurrentBooking: (startDate: string, endDate: string) => void;
  getBookingsByUser: (userId: number) => { place: Place; booking: Booking }[];
};

export type BookingModalProps = {
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
