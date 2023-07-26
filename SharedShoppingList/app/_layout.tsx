import FontAwesome from '@expo/vector-icons/FontAwesome';
import {DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { AuthProvider, useAuth } from "./AuthContext";
// import Login from "./login";
import {createNativeStackNavigator} from "react-native-screens/native-stack";

const Screen = createNativeStackNavigator();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  if (loaded) {
    console.log("ich bin geladen")
  }

  return (
    <>
      <AuthProvider>
          {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
      {/*<AuthProvider>*/}
      {/*  <RootLayoutNav />*/}
      {/*</AuthProvider>*/}
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
                  <Stack>
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                  </Stack>
            ) : (
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
                </Stack>
            )
            }
          </NavigationContainer>
      </ThemeProvider>
    </>
  );
}
