import { Clock } from "../Clock/Clock";
import { Txt } from "../Txt/Txt";
import { s } from "./MeteoBasic.style.js";
import { Image, Text, View } from "react-native";
export function MeteoBasic( {temperature, city, interpretation}) {
  return (
    <>
      <View style={s.clock}>
        <Txt><Clock/></Txt>
      </View>
      <Txt>{city}</Txt>
      <Txt style={s.weather_label}>{interpretation.label}</Txt>

      <View style={s.temperature_box}>
        <Txt style = {s.temperature}>{temperature}° </Txt>
        <Image style={s.image} source={interpretation.image} />
      </View>
    </>
  );
}
