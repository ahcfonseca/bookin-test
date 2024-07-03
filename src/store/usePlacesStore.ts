import create from "zustand";
import moment from "moment";
import { Place, Booking } from "../types/types";

type PlacesState = {
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

// not the best approach, but for the test we save the places and it's bookings here
const usePlacesStore = create<PlacesState>((set, get) => ({
  places: [
    {
      id: 1,
      city: "New York",
      name: "Cozy Apartment in Manhattan",
      image: "new-york-1.webp",
      price: 127,
      beds: 1,
      bookings: [],
    },
    {
      id: 2,
      city: "New York",
      name: "Modern Loft in Brooklyn",
      image: "new-york-2.webp",
      price: 149,
      beds: 2,
      bookings: [],
    },
    {
      id: 3,
      city: "New York",
      name: "Stylish Studio in Times Square",
      image: "new-york-3.webp",
      price: 123,
      beds: 1,
      bookings: [],
    },
    {
      id: 4,
      city: "New York",
      name: "Chic Flat in Greenwich Village",
      image: "new-york-4.webp",
      price: 167,
      beds: 3,
      bookings: [],
    },
    {
      id: 5,
      city: "Rio de Janeiro",
      name: "Beachside Condo",
      image: "rio-1.webp",
      price: 134,
      beds: 1,
      bookings: [],
    },
    {
      id: 6,
      city: "Rio de Janeiro",
      name: "Luxury Villa in Ipanema",
      image: "rio-2.webp",
      price: 136,
      beds: 2,
      bookings: [],
    },
    {
      id: 7,
      city: "Rio de Janeiro",
      name: "Cozy Bungalow in Copacabana",
      image: "rio-3.webp",
      price: 156,
      beds: 3,
      bookings: [],
    },
    {
      id: 8,
      city: "Rio de Janeiro",
      name: "Modern Apartment in Botafogo",
      image: "rio-4.webp",
      price: 119,
      beds: 1,
      bookings: [],
    },
    {
      id: 9,
      city: "London",
      name: "Central London Flat",
      image: "london-1.webp",
      price: 147,
      beds: 2,
      bookings: [],
    },
    {
      id: 10,
      city: "London",
      name: "Cozy Cottage in Camden",
      image: "london-2.webp",
      price: 131,
      beds: 1,
      bookings: [],
    },
    {
      id: 11,
      city: "London",
      name: "Luxury Suite in Kensington",
      image: "london-3.webp",
      price: 127,
      beds: 2,
      bookings: [],
    },
    {
      id: 12,
      city: "London",
      name: "Modern Apartment in Shoreditch",
      image: "london-4.webp",
      price: 129,
      beds: 1,
      bookings: [],
    },
    {
      id: 13,
      city: "Paris",
      name: "Elegant Flat near Eiffel Tower",
      image: "paris-1.webp",
      price: 155,
      beds: 2,
      bookings: [],
    },
    {
      id: 14,
      city: "Paris",
      name: "Charming Studio in Montmartre",
      image: "paris-2.webp",
      price: 127,
      beds: 1,
      bookings: [],
    },
    {
      id: 15,
      city: "Paris",
      name: "Luxury Apartment in Le Marais",
      image: "paris-3.webp",
      price: 118,
      beds: 1,
      bookings: [],
    },
    {
      id: 16,
      city: "Paris",
      name: "Cozy Loft in Latin Quarter",
      image: "paris-4.webp",
      price: 122,
      beds: 1,
      bookings: [],
    },
  ],

  currentBooking: { id: undefined, startDate: "", endDate: "" },
  setCurrentBooking: (id, startDate, endDate) =>
    set({ currentBooking: { id, startDate, endDate } }),

  addBooking: (placeId, startDate, endDate) => {
    set((state) => {
      const timestamp = Date.now();
      const updatedPlaces = state.places.map((place) =>
        place.id === placeId
          ? {
              ...place,
              bookings: [
                ...place.bookings,
                { id: timestamp, userId: 1, startDate, endDate },
              ],
            }
          : place
      );
      return { places: updatedPlaces };
    });
  },

  updateBooking: (placeId, bookingId, startDate, endDate) => {
    set((state) => {
      const updatedPlaces = state.places.map((place) =>
        place.id === placeId
          ? {
              ...place,
              bookings: place.bookings.map((booking) =>
                booking.id === bookingId
                  ? { ...booking, startDate, endDate }
                  : booking
              ),
            }
          : place
      );
      return { places: updatedPlaces };
    });
  },

  deleteBooking: (placeId, bookingId) => {
    set((state) => {
      const updatedPlaces = state.places.map((place) =>
        place.id === placeId
          ? {
              ...place,
              bookings: place.bookings.filter(
                (booking) => booking.id !== bookingId
              ),
            }
          : place
      );
      return { places: updatedPlaces };
    });
  },

  getBookingsByUser: (userId) => {
    return get().places.flatMap((place) =>
      place.bookings
        .filter((booking) => booking.userId === userId)
        .map((booking) => ({ place, booking }))
    );
  },

  getAvailablePlaces: (city, startDate, endDate) => {
    const start = moment(startDate);
    const end = moment(endDate);

    return get().places.filter((place) => {
      if (city && place.city !== city) return false;

      return !place.bookings.some((booking) => {
        const bookingStart = moment(booking.startDate);
        const bookingEnd = moment(booking.endDate);

        return (
          (bookingStart.isSameOrBefore(start) &&
            bookingEnd.isSameOrAfter(start)) ||
          (bookingStart.isSameOrBefore(end) && bookingEnd.isSameOrAfter(end)) ||
          (bookingStart.isAfter(start) && bookingEnd.isBefore(end))
        );
      });
    });
  },
}));

export default usePlacesStore;
