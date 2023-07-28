import React, {createContext, useContext, useEffect, useState} from 'react';
import axios, {AxiosError} from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPAddress } from "../constants/IPAddress";
// import * as SecureStore from "expo-secure-store";
import {useLinkProps} from "@react-navigation/native";
import {useRouter, useSegments} from "expo-router";

interface AuthContextProps {
    userToken?: string | null;
    onIsLoading?: boolean;
    authState?: {token: string | null; authenticated: boolean | null},
    onLogin?: (username: String, password: String) => Promise<void>;
    onLogout?: () => void;
    onRegister?: (username: String, password: String, email: string, firstName: string, lastName: string) => string | null;
    userId?: number;
}

type AuthState = {
    token: string | null;
    authenticated: boolean | null;
}

const TOKEN_KEY = 'my-jwt'

const AuthContext = createContext<AuthContextProps>({});
export const useAuth = () => {
    return useContext(AuthContext)
}

function useProtectedRoute(authState: AuthState, token: string | null) {
    const segment = useSegments();
    const router = useRouter();

    useEffect(() => {
        console.log("in useeffect")
        const inAuthGroup = segment[0] === '(auth)';

        console.log('####')
        console.log(inAuthGroup)
        console.log(segment[0])
        console.log(authState.authenticated)
        console.log('####')

        if ((authState?.authenticated === null || !authState.authenticated) && !inAuthGroup) {
            console.log("auth folder")
            router.push("/login")
        } else if (authState.authenticated != null && inAuthGroup){
            console.log("tabs folder")
            router.push("/group")
        }
    },[token])
}

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [authState, setAuthState] = useState<AuthState>({token: null, authenticated: null});

    useProtectedRoute(authState, authState.token);

    useEffect(() => {
        const loadToken = async () => {
            // const token = await SecureStore.getItemAsync(TOKEN_KEY);
            const token = await AsyncStorage.getItem(TOKEN_KEY);
            console.log("stored: " + token)

            if (token) {
                axios.defaults.headers.common['Authorization'] =`Bearer ${token}`

                setAuthState({
                    token: token,
                    authenticated: true
                })
            }
        }
        loadToken();
    },[])

    const [userToken, setUserToken] = useState<string | null>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [userId, setUserId] = useState(0);
    const router = useRouter();
    const login = async (username: string, password: string) => {
        try {
        const response =  await axios.post(`${IPAddress}/api/auth/login`,
                {email: username.toLowerCase(), password: password}, {headers: {'Content-Type': 'application/json'}
                });
            if (response.status === 200) {
                console.log(response)
                setAuthState({
                    token: response.data.token,
                    authenticated: true
                });
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
                // await SecureStore.setItemAsync(TOKEN_KEY, response.data.token)
                await AsyncStorage.setItem(TOKEN_KEY, response.data.token)
                await AsyncStorage.setItem('userId', response.data.id.toString());
                console.log(response.data.token)
                setUserToken(response.data.token)
                setUserId(response.data.id)
                return response;
            } else {
            }
        } catch (err: any) {
                if (err.status === 401) {
                    setIsSnackbarVisible(true)
                }
        }

    }

    const logout = async () => {
        console.log("loggin out")
        // await SecureStore.deleteItemAsync(TOKEN_KEY);
        await AsyncStorage.removeItem(TOKEN_KEY);
        // axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false
        })
        // router.replace("/login")

        console.log(authState)
        // useProtectedRoute(authState);

        // https://www.youtube.com/watch?v=9vydY9SDtAo
        // https://www.youtube.com/watch?v=QMUii9fSKfQ&t=242s
    }

    const register = async (username: string, password: string, email: string, firstName: string, lastName: string ) => {
        try {
            return await axios.post(`${IPAddress}/api/auth/registration`, JSON.stringify({
                "firstName": firstName,
                "lastName": lastName,
                "password": password,
                "email": email,
                "username": username
            }), {headers: {"Content-Type": "application/json"}})
        } catch (e: any) {
            console.log("das ist error")
            return e.response.data.message;
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

