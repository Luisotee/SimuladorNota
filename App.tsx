import {
  ThemeProvider,
  createTheme,
  darkColors,
  lightColors,
  useTheme,
  useThemeMode,
} from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, SafeAreaView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { EmptyCard } from "./src/components/empty-card";
import { useColorScheme } from "react-native-appearance";

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
  darkColors: {
    ...Platform.select({
      default: darkColors.platform.android,
      ios: darkColors.platform.ios,
    }),
  },
  mode: "dark",
});

/*const ColorScheme = ({ children }: any) => {
  const colorMode = useColorScheme();
  const { theme } = useTheme();
  const { setMode } = useThemeMode();

  React.useEffect(() => {
    setMode(colorMode);
  }, [colorMode]);

  return (
    <View style={{ backgroundColor: theme.colors.background }}>{children}</View>
  );
};*/

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StatusBar style="auto" />
        <SafeAreaView style={{ marginTop: 20 }}>
          <EmptyCard />
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
