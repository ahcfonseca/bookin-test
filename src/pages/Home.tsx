import { useState } from "react";
import TabSwitcher from "../components/TabSwitcher";
import PlacesGrid from "../components/PlacesGrid";
import BookingForm from "../components/BookingForm";
import usePlacesStore from "../store/usePlacesStore";
import { Place } from "../types/types";
import MyBookings from "../components/MyBookings";

const Home = () => {
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const places = usePlacesStore((state) => state.places);
  const [currentTab, setCurrentTab] = useState("available");
  const [currentCity, setCurrentCity] = useState<string>("");

  const handleSearch = (city: string, startDate: string, endDate: string) => {
    setCurrentCity(city);
    const filtered = places.filter((place) => {
      const isCityMatch = city ? place.city === city : true;
      // Further filtering logic based on startDate and endDate can be added here
      return isCityMatch;
    });
    setFilteredPlaces(filtered);
  };

  //TODO: reset filtered results when changing tabs

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
