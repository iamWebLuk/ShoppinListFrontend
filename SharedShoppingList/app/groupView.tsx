import React, {useEffect, useState} from 'react';
import {useColorScheme, View} from "react-native";
import {Button, Divider, List, Text} from "react-native-paper";
import {useLocalSearchParams, useNavigation, useRouter} from "expo-router";
import {colorTheme} from "../constants/Colors";
import axios from "axios";
import {IPAddress} from "../constants/IPAddress";

type Item = {
    id: number;
    itemName: string;
}
const GroupView = () => {

    const [data, setData] = useState([]);
    const router = useRouter();
    const navigation = useNavigation();
    const params = useLocalSearchParams();

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${IPAddress}:8080/item/getItems?groupId=${params.groupId}`,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsdWthc0B3ZWJlci5jb20iLCJleHAiOjE2OTAwNjc2MDQsImlhdCI6MTY4OTE2NjQyN30.k5pzJO3GLynmsuc5UH0uId2guY9u5phm7t2rI8L6hf8'
        }
    };


    useEffect(() => {
        axios.request(config)
            .then(res => {
                console.log(res)
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])


    console.log(data)
    console.log("data")
    return (
        <>
            <View>
                {data.map((item: Item) => (
                    <>
                      <List.Item title={item.itemName} titleStyle={{color: colorTheme.text}}/>
                        <Divider />
                    </>
                    ))}
                <Button onPress={() => router.replace('groupScreen')}>Back</Button>

                <Button style={{position:'absolute', top: 200, left: 0}}>asdf</Button>
            </View>
        </>
    );
};

export default GroupView;