import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { View } from '../components/Themed';

import {
    TextInput,
    Button,
    Snackbar,
    useTheme,
    Text,
    Switch, adaptNavigationTheme
} from "react-native-paper";
import { AuthContext } from "../AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorTheme } from "../constants/Colors";
// import { PreferencesContext } from "./_layout";

interface LoginScreenProps {
    isDarkMode?: boolean
    setIsDarkMode?: Dispatch<SetStateAction<boolean>>
}
export default function LoginScreen({isDarkMode, setIsDarkMode}: LoginScreenProps) {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [jwtToken, setJwtToken] = useState('');
    const [isSecurePassword, setIsSecurePassword] = useState(true);
    // const { toggleTheme, isDarkTheme } = useContext(PreferencesContext)
    // const { colors } = useTheme();
    // const theme = useTheme();
    const mockDarkMode = true;
    const {login, register} = useContext(AuthContext);
    const disableSnackbar = () => {
        setIsSnackbarVisible(false);
    }


    const disableHiddenPassword = () => {
      setIsSecurePassword(!isSecurePassword)

    }
    const getToken = async () => {
        try {
            await AsyncStorage.removeItem('token');
            const userToken = await AsyncStorage.getItem('token')
            console.log(userToken)
        } catch (error) {
            console.log(error)
        }
    }

    const removeUser = async () => {
        try {
            await AsyncStorage.removeItem("token");
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(isDarkTheme)
    // console.log("^ isDarkTheme")
    return (
        <View>
            <Text style={{color: colorTheme.background}}>This is a test!</Text>
            <TextInput
                placeholderTextColor={'white'}
                textColor={colorTheme.text} label='Username' value={username} onChange={(e) => setUsername(e.nativeEvent.text)}/>
            <View>
            <TextInput
                secureTextEntry={isSecurePassword}
                label='Password'
                value={password}
                placeholderTextColor={colorTheme.button}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                right={<TextInput.Icon color={colorTheme.button} icon={isSecurePassword ? 'eye' : 'eye-off'} onPress={() => disableHiddenPassword()} />}
            />

            </View>
                <Button icon='camera'
                    mode='contained'
                    onPress={() => login(username,password)}>Login</Button>
            <Button icon='camera' mode='contained' onPress={removeUser}>Click me</Button>
            <Button icon='camera' mode='contained' onPress={register}>register</Button>
            {/*<Switch color={'red'} value={isDarkTheme} onValueChange={toggleTheme} />*/}
            <TextInput
                // theme={{colors: {primary: theme?.colors.surface,},}}
                placeholder={"Password"}
            />
            <Snackbar
                visible={isSnackbarVisible}
                onDismiss={() => setIsSnackbarVisible(false)}
                action={{
                    label: 'Undo',
                    onPress: () => {
                        // Do something
                        setIsSnackbarVisible(false)
                    },
                }}>
                Bad Credentials
            </Snackbar>
        </View>
    );
};
