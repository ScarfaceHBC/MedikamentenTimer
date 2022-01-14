import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useMemo } from "react";
import { LoginScreen } from "../Screens/LoginScreen";
import merge from "deepmerge";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  Text,
} from "react-native-paper";
import { Context } from "../utils/Context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
const Tab = createBottomTabNavigator();
import { WelcomeScreen } from "../Screens/WelcomeScreen";
import { NoticeScreen } from "../Screens/NoticeScreen";
import { MedicationScreen } from "../Screens/MedicationScreen";
import { DoctorsScreen } from "../Screens/DoctorsScreen";
import * as Icon from "@expo/vector-icons";

import { LoginScreen2 } from "../Screens/LoginScreen2";

// TODO: Theming: hier die beiden Thmes definieren
const DefaultThemeNew = {
  ...CombinedDefaultTheme,
  roundness: 2,
  colors: {
    ...CombinedDefaultTheme.colors,
    primary: "red",
    accent: "#f1c40f",
  },
};

export default function MainController() {
  // TODO: Theming: hier die beiden Themes ändern
  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const [isThemeDark, setIsThemeDark] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({});

  // Theme
  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  // User Status
  const toggleSignIn = useCallback(() => {
    return setIsSignedIn(!isSignedIn);
  }, [isSignedIn]);

  const setUserFunc = useCallback(
    (user) => {
      return setUser(user);
    },
    [user]
  );

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
      toggleSignIn,
      isSignedIn,
      setUserFunc,
      user,
    }),
    [toggleTheme, isThemeDark, toggleSignIn, isSignedIn, setUserFunc, user]
  );

  return (
    <Context.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Willkommen") {
                  //iconName = focused ? "home" : "home-outline";
                  iconName = "home";
                } else if (route.name === "Ihre Medikation") {
                  //iconName = focused ? "newspaper" : "newspaper-outline";
                  iconName = "hand-holding-medical";
                } else if (route.name === "Aerzte") {
                  //iconName = focused ? "newspaper" : "newspaper-outline";
                  iconName = "comment-medical";
                } else if (route.name === "Notizen") {
                  //iconName = focused ? "newspaper" : "newspaper-outline";
                  iconName = "notes-medical";
                } else if (route.name === "Login") {
                  //iconName = focused ? "newspaper" : "newspaper-outline";
                  iconName = "key";
                }

                return (
                  <Icon.FontAwesome5
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              },
              tabBarActiveTintColor: "red",
              tabBarInactiveTintColor: "gray",
            })}
          >
            {isSignedIn ? (
              <>
                <Tab.Screen name="Willkommen" component={WelcomeScreen} />
                <Tab.Screen
                  name="Ihre Medikation"
                  component={MedicationScreen}
                />
                <Tab.Screen name="Aerzte" component={DoctorsScreen} />
                <Tab.Screen name="Notizen" component={NoticeScreen} />
              </>
            ) : (
              <Tab.Screen name="Login" component={LoginScreen2} />
            )}
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Context.Provider>
  );
}
