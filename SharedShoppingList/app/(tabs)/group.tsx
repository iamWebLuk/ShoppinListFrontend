import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Divider, List, Text } from "react-native-paper";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IPAddress } from "../../constants/IPAddress";
import { useAuth } from "../AuthContext";
import { useIsFocused } from "@react-navigation/native";
import { useRouter} from "expo-router";
import { useColors } from '../../constants/Colors'

type Group = {
    id: number
    groupName: String;
    groupDescription: String;

}
const Group = () => {

    // const [userId, setUserId] = useState(5);
    const [data, setData] = useState([])
    const [bearerToken, setBearerToken] = useState('');
    const {userId} = useAuth();
    const colors = useColors();
    const isFocused = useIsFocused();
    const router = useRouter();
    const {authState} = useAuth();
    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('token');
                console.log("this is the value:")
                console.log(value)
                if (value !== null) {
                    setBearerToken(value)
                }
            } catch (e) {
                // error reading value
                console.log(e)
            }
        };
        getData();
    }, [])

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${IPAddress}/group/getGroups?userId=${userId}`,
        headers: {
            'Authorization': `Bearer ${authState?.token}`
        }
    };

    console.log("This is the authstate token:");
    console.log(authState?.token)

    console.log("thats data")
    console.log(data)

    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + bearerToken;

    useEffect(() => {
        console.log("user id:");
        console.log(userId)
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
                    <List.Item title={res.groupName} description={res.groupDescription} onPress={() => router.push({pathname: 'groupView', params: {groupId: res.id}} )} titleStyle={{color: colors.text}}/>
                    <Divider/>
                    <Text>
                    </Text>
                </View>
            ))}
        </>
    );
};

export default Group;