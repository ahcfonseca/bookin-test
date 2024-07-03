import { useEffect, useState } from "react";
import TabSwitcher from "../components/TabSwitcher";
import PlacesGrid from "../components/PlacesGrid";
import BookingForm from "../components/BookingForm";
import usePlacesStore from "../store/usePlacesStore";
import { Place } from "../types/types";
import MyBookings from "../components/MyBookings";

const Home = () => {
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const places = usePlacesStore((state) => state.places);
  const getAvailablePlaces = usePlacesStore(
    (state) => state.getAvailablePlaces
  );
  const [currentTab, setCurrentTab] = useState<string>("available");
  const [currentCity, setCurrentCity] = useState<string>("");

  const handleSearch = (city: string, startDate: string, endDate: string) => {
    setCurrentCity(city);
    const availablePlaces = getAvailablePlaces(city, startDate, endDate); // getting the available places for the choosed date on home page
    setFilteredPlaces(availablePlaces);
  };

  // reseting results after changing tabs
  useEffect(() => {
    setFilteredPlaces(places);
    setCurrentCity("");
  }, [currentTab]);

  return (
    <>
      <TabSwitcher onChangeTab={setCurrentTab} />
      {currentTab === "available" ? (
        <>
          <BookingForm onSearch={handleSearch}></BookingForm>
          <PlacesGrid
            currentCity={currentCity}
            places={filteredPlaces.length ? filteredPlaces : places}
          ></PlacesGrid>
        </>
      ) : (
        <>
          <MyBookings></MyBookings>
        </>
      )}
    </>
  );
};

export default Home;
