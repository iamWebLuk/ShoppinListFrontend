import {useColorScheme} from "react-native";

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const Colors =  {
  light: {
    text: '#000',
    surface: '#808080',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    button: '#4f9533',
    delete: '#c21807'
  },
  dark: {
    text: '#ffffff',
    surface: '#212124',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    button: '#9f15ec',
    delete: '#c21807'
  },
};

// const color = useColorScheme();
// export const colorTheme = color === 'dark' ? Colors.dark : Colors.light;

export const useColors = () => {
  const color = useColorScheme();
  return color === 'dark' ? Colors.dark : Colors.light
}
