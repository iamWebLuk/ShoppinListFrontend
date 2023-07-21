import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPAddress } from "../constants/IPAddress";
import * as SecureStore from 'expo-secure-store';

interface AuthContextProps {
    userToken?: string | null;
    onIsLoading?: boolean;
    authState?: {token: string | null; authenticated: boolean | null},
    onLogin?: (username: String, password: String) => Promise<void>;
    onLogout?: () => void;
    onRegister?: () => void;
    userId?: number;
}

const TOKEN_KEY = 'my-jwt'

const AuthContext = createContext<AuthContextProps>({});
export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    })

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log("stored: " + token)

            if (token) {
                axios.defaults.headers.common['Authorization'] =`Bearer ${token}`

                setAuthState({
                    token: token,
                    authenticated: true
                })
            }
        }
    },[])

    const [userToken, setUserToken] = useState<string | null>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [userId, setUserId] = useState(0);
    const login = async (username: string, password: string) => {
        try {
        const response =  await axios.post(`${IPAddress}/api/auth/login`,
                {email: username.toLowerCase(), password: password}, {headers: {'Content-Type': 'application/json'}
                });
            if (response.status === 200) {
                setAuthState({
                    token: response.data.token,
                    authenticated: true
                });
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
                await SecureStore.setItemAsync(TOKEN_KEY, response.data.token)

                const token = await AsyncStorage.getItem('token')
                console.log(response.data.token)
                setUserToken(response.data.token)
                setUserId(response.data.id)
                return response;
            } else {
                console.log("woj")
            }
        } catch (err: any) {
                if (err.status === 401) {
                    setIsSnackbarVisible(true)
                }
        }

    }

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false
        })
        // https://www.youtube.com/watch?v=9vydY9SDtAo
        // https://www.youtube.com/watch?v=QMUii9fSKfQ&t=242s
    }

    const register = async (email: string, password: string) => {
        try {
            return await axios.post(`${IPAddress}/api/auth/registration`, JSON.stringify({
                "firstName": "lukas",
                "lastName": "weber",
                "password": `${password}`,
                "email": `${email}`,
                "username": `lukas${Math.floor(Math.random() * 10)}`
            }), {headers: {"Content-Type": "application/json"}})
        } catch (e) {
            console.log(e)
        }
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
        userId,
        userToken,
        isLoading}


    // @ts-ignore
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
};