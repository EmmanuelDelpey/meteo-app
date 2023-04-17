import { View } from "react-native";
import { s } from "./Home.style.js";
import { Text } from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { useEffect, useState } from "react";
import { MeteoApi } from "../../api/meteo.js";
import { Txt } from "../../components/Txt/Txt.jsx";
import { MeteoBasic } from "../../components/MeteoBasic/MeteoBasic.jsx";
import { getWeatherInterpretation } from "../../services/meteo-service.js";
import { MeteoAdvanced } from "../../components/MeteoAdvanced/MeteoAdvanced.jsx";

export function Home() {
  const [userCoords, setUserCoords] = useState();
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();

  const currentWeather = weather?.current_weather;


  useEffect(() => {
    getUserCoords();
  }, []);
  useEffect(() => {
    if (userCoords) {
      fetchWeather(userCoords);
      fetchCity(userCoords);
    }
  }, [userCoords]);

  async function getUserCoords() {
    let { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await getCurrentPositionAsync();
      setUserCoords({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } else {
      setUserCoords({ lat: "48.45", lng: "2.35" });
    }
  }

  async function fetchWeather(coordinates) {
    const weatherResponse = await MeteoApi.fetchWeatherFromCoords(coordinates);
    setWeather(weatherResponse);
  };

 async function fetchCity(coordinates) {
   const cityResponse = await MeteoApi.fetchCityFromCoords(coordinates);
   setCity(cityResponse);
   console.log(cityResponse);
 }
  console.log(weather)
  
  return currentWeather ?  (
    <>
      <View style={s.meteo_basic}>
        <MeteoBasic temperature={Math.round(currentWeather?.temperature)} city={city}
          interpretation={getWeatherInterpretation(currentWeather.weathercode)} />
      </View>
      <View style={s.searchbar_container}></View>
      <View style={s.meteo_advanced}><MeteoAdvanced wind={currentWeather.windspeed} dusk={weather.daily.sunrise[0].split("T")[1]} dawn={weather.daily.sunset[0].split("T")[1]} /></View>
    </>
  ) : null;
}
