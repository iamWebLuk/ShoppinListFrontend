import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Divider, List} from "react-native-paper";
import {View} from "react-native";

type Group = {
    groupName: String;
    groupDescription: String;

}
const GroupScreen = () => {

    const [userId, setUserId] = useState(5);
    const [data, setData] = useState([])
    const bearerToken = localStorage.getItem("token")

    axios.defaults.headers.common['authorization'] = 'Bearer ' + bearerToken;

    useEffect(() => {
        axios.get(`//localhost:8080/group/getGroups?userId=${userId}`)
            .then(res => {
                console.log("lul")
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    return (
        <div>
            {data.map((res: Group) => (
                <View>
                    <List.Item title={res.groupName} description={res.groupDescription}/>
                    <Divider />
                </View>
            ))}
        </div>
    );
};

export default GroupScreen;