//import AppLoading from "expo-app-loading";  
import { useFonts } from "expo-font";
import Rootstack from "./navigators/RootStack";
//import * as SplashScreen from 'expo-splash-screen';
import Login from "./screens/Login";
import React from "react";

export default function App() {
let [fontsLoaded] = useFonts({
  "SimSun": require("./assets/fonts/SimSun-ExtB.ttf")
});

 if (!fontsLoaded) {
  return null; 
 }
  return (
    <Rootstack/>
  );
}


