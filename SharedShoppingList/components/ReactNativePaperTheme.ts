import {adaptNavigationTheme, DefaultTheme, MD3DarkTheme, MD3LightTheme} from 'react-native-paper';
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';
import deepmerge from "deepmerge";

export const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

const lightColors = {
    primary: '#ecff95',
    accent: '#FFC107',
    background: '#FFFFFF',
    text: '#000000',
    onSurface: 'grey'
}

const darkColors = {
    primary: '#00ff9c',
    accent: '#FFC107',
    background: '#000000',
    text: '#FFFFFF',
    placeholder: '#ffffff',
    surface: '#000000',
    onSurface: '#ffffff'
}

// trying using only these two lines
export const CombinedDefaultTheme = deepmerge(MD3LightTheme, LightTheme);
export const CombinedDarkTheme = deepmerge(MD3DarkTheme, DarkTheme);

export const lightTheme = {
    ...MD3LightTheme,
    ...lightColors,
    colors: {
        ...MD3LightTheme.colors,
        ...lightColors,
    },
};

export const darkTheme = {
    ...MD3DarkTheme,
    ...darkColors,
    colors: {
        ...MD3DarkTheme.colors,
        ...darkColors,
    },
};