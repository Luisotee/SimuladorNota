import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Home } from "./src/pages/home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <StatusBar style="auto" />
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}
