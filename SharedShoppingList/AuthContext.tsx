import React, {createContext, useState} from 'react';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
interface AuthContextType {
    userToken: string | null;
    isLoading: boolean;
    login: (username: String, password: String) => Promise<void>;
    logout: () => void;
}
export const AuthContext = createContext<AuthContextType>({
    userToken: '',
    isLoading: false,
    login: async () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [userToken, setUserToken] = useState<string | null>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const login = async (username: string, password: string) => {
            console.log(username)
            console.log(password)
            console.log("authcontext")
            const json = JSON.stringify({email: username, password: password})
        try {
        const response =  await axios.post("http://localhost:8080/api/auth/login",
                {email: username, password: password}, {headers: {'Content-Type': 'application/json'}
                });
            console.log(response)
            if (response.status === 200) {
                    await AsyncStorage.setItem("token", response.data.token)
                const token = await AsyncStorage.getItem('token')
                setUserToken(token)
            } else {
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

    return <AuthContext.Provider value={{userToken, isLoading, login, logout}}>
        {children}
    </AuthContext.Provider>
};