import React, {useState} from 'react';
import {Button, Snackbar, Text, TextInput} from "react-native-paper";
import {View} from "react-native";
import {useColors} from "../../constants/Colors";
import {useAuth} from "../AuthContext";

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [errorText, setErrorText] = useState('');
    const [showSnackBar, setShowSnackbar] = useState(false);

    const colors = useColors();
    const {onRegister} = useAuth();

    const isPasswordCorrect = () => {
        return password === confirmPassword;
    };

    const allDataCorrect = () => {
        const checkPassword = isPasswordCorrect()
        console.log(checkPassword + " checkpasswordd")
        console.log(username !== '' && firstName !== '' && lastName !== '' && checkPassword && email !== '' && username !== '');
    return (username !== '' && firstName !== '' && lastName !== '' && checkPassword && email !== '' && username !== '')

    }

    const handleButtonClick = async() => {
        if (onRegister) {
            const errerrorText = await onRegister(username, password, email, firstName, lastName)
            setErrorText(errerrorText ? errerrorText : '')
            console.log("hihi register")
            console.log(errorText)
            setShowSnackbar(true)
        }

    }

    return (
        <>
            <Snackbar visible={showSnackBar} onDismiss={() => setShowSnackbar(false)}
                      action={{
                          color: 'red',
                label: 'Close',
                onPress: () => {
                    setShowSnackbar(false)
                    // Do something
                },
            }}
                     theme={{colors: {inversePrimary: colors.delete}}}>{errorText}</Snackbar>
        <View style={{marginTop: '20%'}}>

            <TextInput
                placeholderTextColor={colors.text}
                textColor={colors.text} label='Username' value={username} onChange={(e) => setUsername(e.nativeEvent.text)}
                style={{margin: 10, backgroundColor: colors.surface, color: 'white'}}
            />
            <TextInput
                placeholderTextColor={colors.text}
                textColor={colors.text} label='First Name' value={firstName} onChange={(e) => setFirstName(e.nativeEvent.text)}
                style={{margin: 10, backgroundColor: colors.surface, color: 'white'}}
            />
            <TextInput
                placeholderTextColor={colors.text}
                textColor={colors.text} label='Last Name' value={lastName} onChange={(e) => setLastName(e.nativeEvent.text)}
                style={{margin: 10, backgroundColor: colors.surface, color: 'white'}}
            />
            <TextInput
                placeholderTextColor={colors.text}
                textColor={colors.text} label='Email' value={email} onChange={(e) => setEmail(e.nativeEvent.text)}
                style={{margin: 10, backgroundColor: colors.surface, color: 'white'}}
            />
            <TextInput
                placeholderTextColor={colors.text}
                textColor={colors.text} label='Password' value={password} onChange={(e) => setPassword(e.nativeEvent.text)}
                style={{margin: 10, backgroundColor: colors.surface, color: 'white'}}
            />
            <TextInput
                placeholderTextColor={colors.text}
                textColor={colors.text} label='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                style={{margin: 10, backgroundColor: colors.surface, color: 'white'}}
            />
            <Button
                disabled={password.length === 0 || !allDataCorrect()}
                mode='contained'
                buttonColor={colors.button}
                style={{margin: 10}}
                onPress={handleButtonClick}
            >Register</Button>

        </View>
            </>
    );
};

export default Register;