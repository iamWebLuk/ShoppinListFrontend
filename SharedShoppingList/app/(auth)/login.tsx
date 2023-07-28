import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { View } from '../../components/Themed';

import {
    TextInput,
    Button,
    Snackbar,
    Text,
} from "react-native-paper";
import { useAuth } from "../AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useColors} from "../../constants/Colors";
import {useRouter} from "expo-router";
import {Image} from "react-native";
interface LoginScreenProps {
    isDarkMode?: boolean
    setIsDarkMode?: Dispatch<SetStateAction<boolean>>
}
const Login = ({isDarkMode, setIsDarkMode}: LoginScreenProps) => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [isSecurePassword, setIsSecurePassword] = useState(true);
    const colors = useColors();
    const {onLogin, onRegister} = useAuth();
    const router = useRouter();


    const disableHiddenPassword = () => {
      setIsSecurePassword(!isSecurePassword)

    }

    const removeUser = async () => {
        try {
            await AsyncStorage.removeItem("token");
        } catch (error) {
            console.log(error);
        }
    };

    console.log("show me")

    return (
        <>
        <View style={{marginTop: '50%', justifyContent: 'center'}}>
            <View style={{alignItems: 'center'}}>
            <Image source={require("../../assets/images/ShoppingBags.jpg")} style={{width: 200, height: 200}}/>
            </View>
            <TextInput
                placeholderTextColor={colors.text}
                textColor={colors.text} label='Username' value={username} onChange={(e) => setUsername(e.nativeEvent.text)}
                style={{margin: 10, backgroundColor: colors.surface, color: 'white'}}
            />
            <View>
            <TextInput
                secureTextEntry={isSecurePassword}
                label='Password'
                value={password}
                placeholderTextColor={colors.text}
                textColor={colors.text}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                right={<TextInput.Icon color={colors.surface} icon={isSecurePassword ? 'eye' : 'eye-off'} onPress={() => disableHiddenPassword()} />}
                style={{margin: 10, backgroundColor: colors.surface, color: 'white'}}
            />

            </View>
                <Button
                    icon='camera'
                    mode='contained'
                    buttonColor={colors.button}
                    onPress={() => onLogin && onLogin(username,password)}
                    style={{margin: 10}}
                >
                    Login
                </Button>

                <Button icon='pen'
                        mode='contained'
                        buttonColor={colors.button}
                        onPress={() => {router.push("/register")}}
                        style={{margin: 10}}
                >
                    register
                </Button>
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
                <Text>
                Bad Credentials
                </Text>
            </Snackbar>
        </View>
            </>
    );
};

export default Login;