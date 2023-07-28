import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Slot, SplashScreen, Stack} from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';
import { AuthProvider, useAuth } from "./AuthContext";
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
  // const [loaded, error] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  //   ...FontAwesome.font,
  // });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  // useEffect(() => {
  //   if (error) throw error;
  // }, [error]);

  // if (!loaded) {
  //   // return null;
  //   return <Slot />
  // }

  // if (loaded) {
  //   console.log("ich bin geladen")
  // }

  return (
    <>
      {/*    {!loaded && <SplashScreen />}*/}
      {/*{loaded && */}
          <RootLayoutNav />
      {/*}*/}

    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const {authState, onLogout} = useAuth();
  return (
      <>
        <AuthProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            {/*<Provider theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>*/}

                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                  <Stack.Screen name="register" options={{ presentation: 'modal' }} />
                  <Stack.Screen name="modal" options={{ presentation: 'modal'}} />
                </Stack>
                {/*</Provider>*/}
            </ThemeProvider>
        </AuthProvider>
    </>
  );
}
