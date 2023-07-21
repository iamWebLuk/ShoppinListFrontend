import FontAwesome from '@expo/vector-icons/FontAwesome';
import {DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { AuthProvider, useAuth } from "./AuthContext";
// import Login from "./login";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import Login from "./login";

const Screen = createNativeStackNavigator();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [appisReady, setAppIsReady] = useState(false);
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

useEffect(() =>  {
  if (loaded) {
    SplashScreen.hideAsync();
  }
},[loaded])

  if (!loaded) {
    return null;
  }

  return (
    <>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const {authState, onLogout} = useAuth();
  return (
      <>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <NavigationContainer independent={true}>
              {authState?.authenticated === null ? (
                  <Screen.Screen name={'login'} component={Login} />
            ) : (
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            )
            }
          </NavigationContainer>
      </ThemeProvider>
    </>
  );
}
