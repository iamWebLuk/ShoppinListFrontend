import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Divider, List, Text } from "react-native-paper";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IPAddress } from "../../constants/IPAddress";
import { useAuth } from "../../AuthContext";
import { useIsFocused } from "@react-navigation/native";
import { useRouter} from "expo-router";
import { colorTheme } from '../../constants/Colors'

type Group = {
    id: number
    groupName: String;
    groupDescription: String;

}
const GroupScreen = () => {

    // const [userId, setUserId] = useState(5);
    const [data, setData] = useState([])
    const [bearerToken, setBearerToken] = useState('');
    const {userId} = useAuth();
    const isFocused = useIsFocused();
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('token');
                if (value !== null) {
                    setBearerToken(value)
                }
            } catch (e) {
                // error reading value
                console.log(e)
            }
        };
    }, [])

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${IPAddress}:8080/group/getGroups?userId=${userId}`,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsdWthc0B3ZWJlci5jb20iLCJleHAiOjE2OTAwNjc2MDQsImlhdCI6MTY4OTE2NjQyN30.k5pzJO3GLynmsuc5UH0uId2guY9u5phm7t2rI8L6hf8'
        }
    };

    console.log(bearerToken)
    console.log("^bearre token")

    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + bearerToken;

    useEffect(() => {
            // axios.request(config)
        // axios.get(`${IPAddress}:8080/group/getGroups?userId=${userId}`)
        axios.request(config)
            .then(res => {
                console.log("lul")
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [isFocused])

    return (
        <>
            {data.map((res: Group) => (
                <View>
                    <List.Item title={res.groupName} description={res.groupDescription} onPress={() => router.push({pathname: 'groupView', params: {groupId: res.id}} )} titleStyle={{color: colorTheme.text}}/>
                    <Divider/>
                    <Text>
                    </Text>
                </View>
            ))}
        </>
    );
};

export default GroupScreen;