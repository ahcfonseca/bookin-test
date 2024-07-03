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

export type Dates = {
  startDate: string;
  endDate: string;
};
