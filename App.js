import { ImageBackground } from "react-native";
import { Home } from "./pages/Home/Home";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { s } from "./App.style.js";
import backgroundImg from "./assets/background.png";
import AlataRegular from "./assets/fonts/Alata-Regular.ttf";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/native-stack";

const Stack = createStackNavigator();

export default function App() {
  const [isFontLoaded] = useFonts({
    "Alata-Regular": AlataRegular,
  });

  return (
    <NavigationContainer>
      <ImageBackground
        source={backgroundImg}
        style={s.img_background}
        imageStyle={s.img}
      >
        <SafeAreaProvider>
          <SafeAreaView style={s.container}>
            {isFontLoaded ? (
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
              </Stack.Navigator>
            ) : null}
          </SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
    </NavigationContainer>
  );
}
