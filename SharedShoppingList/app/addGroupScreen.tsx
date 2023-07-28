import React, {useState} from 'react';
import {Animated, View} from "react-native";
import {Button, Text, TextInput} from "react-native-paper";
import {IPAddress} from "../constants/IPAddress";
import axios from "axios";
import {useNavigation, useRouter} from "expo-router";
import {useAuth} from "./AuthContext";

const AddGroupScreen = () => {

    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const {userId} = useAuth();
    const navigation = useNavigation();
    const router = useRouter();
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${IPAddress}/group/addGroup?name=${groupName}&description=${description}&userId=${userId}`,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsdWthc0B3ZWJlci5jb20iLCJleHAiOjE2OTAwNjc2MDQsImlhdCI6MTY4OTE2NjQyN30.k5pzJO3GLynmsuc5UH0uId2guY9u5phm7t2rI8L6hf8'
        }
    };

    const addGroup = () => {
        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                // router.replace('GroupScreen')
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <View>
            <Text variant='titleLarge' style={{textAlign: 'center'}}>Add a new Group</Text>
            <TextInput mode='outlined' style={{margin: 10}} placeholder='Group Name'  onChange={(e) => setGroupName(e.nativeEvent.text)}/>
            <TextInput mode='outlined' style={{margin: 10}} placeholder='Group Description'  onChange={(e) => setDescription(e.nativeEvent.text)}/>
            <Button onPress={addGroup} mode='contained' style={{margin: 10}}>Add Group</Button>
        </View>
    );
};

export default AddGroupScreen;