import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPAddress } from "./constants/IPAddress";
interface AuthContextType {
    userToken: string | null;
    isLoading: boolean;
    login: (username: String, password: String) => Promise<void>;
    logout: () => void;
    register: () => void;
    userId: number;
}

export const useAuth = () => {
    return useContext(AuthContext)
}
export const AuthContext = createContext<AuthContextType>({
    userToken: '',
    isLoading: false,
    login: async () => {},
    logout: () => {},
    register: () => {},
    userId: 0,
});

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    })
    const [userToken, setUserToken] = useState<string | null>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [userId, setUserId] = useState(0);
    const login = async (username: string, password: string) => {
            console.log(username)
            console.log(password)
            console.log("authcontext")
            const json = JSON.stringify({email: username, password: password})
        try {
        // const response =  await axios.post("//localhost:8080/api/auth/login",
        const response =  await axios.post(`${IPAddress}:8080/api/auth/login`,
                {email: username.toLowerCase(), password: password}, {headers: {'Content-Type': 'application/json'}
                });
            console.log(response)
            if (response.status === 200) {
                console.log("jow")
                    await AsyncStorage.setItem("token", response.data.token)
                const token = await AsyncStorage.getItem('token')
                console.log(response.data.token)
                setUserToken(response.data.token)
                setUserId(response.data.id)
                console.log(userToken)
                console.log("hihi")
            } else {
                console.log("woj")
            }
        } catch (err: any) {
                if (err.status === 401) {
                    setIsSnackbarVisible(true)
                }
        }
                // .then((res) => {
                //     console.log(res)
                //     setUserToken(res.data.token)
                //     console.log("it worked")
                // })
                // .catch((err) => {
                //     console.log(err)
                //     console.log(typeof err)
                //     if (err.request.status == '401') {
                //         console.log('Bad Credentials');
                //         setIsSnackbarVisible(true)
                //     }
                    // console.log(err +  " this is a error");

    }

    const logout = () => {
        // https://www.youtube.com/watch?v=9vydY9SDtAo
        // https://www.youtube.com/watch?v=QMUii9fSKfQ&t=242s
    }

    const register = async (email: string, password: string) => {
        try {
            return await axios.post(`${IPAddress}:8080/api/auth/registration`, JSON.stringify({
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

    // @ts-ignore
    return <AuthContext.Provider value={{userId, userToken, isLoading, login, logout, register}}>
        {children}
    </AuthContext.Provider>
};