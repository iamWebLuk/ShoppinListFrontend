import React, {useContext, useEffect, useState} from 'react';
import { Text, View } from '../../components/Themed';
import axios from "axios";
import {TextInput, Button, Snackbar} from "react-native-paper";
import { AuthContext } from "../../AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TryOutScreen() {

    const [item, setItem] = useState('');
    const [groupId, setGroupId] = useState('');
    const [groupName, setgroupName] = useState("");
    const [description, setdescription]= useState("");
    const bearerToken = localStorage.getItem("token")

    axios.defaults.headers.common['authorization'] = 'Bearer ' + bearerToken;
    const addGroup = (groupName: String, description: String) => {
        // axios.get("http://localhost:8080/group/ping")
        //     .catch(err => console.log(err))

        axios.post(`//localhost:8080/group/addGroup?name=${groupName}&description=${description}`)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        console.log("hallo")

    }

useEffect(() => {
    console.log(bearerToken)
},[])

    return (
        <View>
            <Text>This is a test!</Text>
            <TextInput label='goupName' value={groupName} onChange={(e) => setgroupName(e.nativeEvent.text)}/>
            <TextInput label='desription' value={description} onChange={(e) => setdescription(e.nativeEvent.text)}/>
            <Button icon='camera' mode='contained' onPress={() =>{
                console.log(groupName)
                console.log(description)
            }}>Click me</Button>
            <Button onPress={() => {
                console.log("name" + groupName)
                console.log("description" + description)
                console.log("token" + bearerToken)
            }
            }>getinfos</Button>
            <Button icon='camera' mode='contained' onPress={() => addGroup(groupName, description)}>Add Group</Button>
        </View>
    );
};
