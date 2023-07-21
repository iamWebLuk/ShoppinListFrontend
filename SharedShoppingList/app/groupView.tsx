import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {Avatar, Button, Divider, List, Text} from "react-native-paper";
import {useLocalSearchParams, useNavigation, useRouter} from "expo-router";
// import {colorTheme} from "../constants/Colors";
import axios from "axios";
import {IPAddress} from "../constants/IPAddress";
import {useColors} from "../constants/Colors";

type Item = {
    id: number;
    itemName: string;
    category: string;
}

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    iconColor: string;
}
const GroupView = () => {

    const [data, setData] = useState([]);
    const [users, setUsers] = useState([])
    const [userInitials, setUserInitials] = useState('');
    const router = useRouter();
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const [itemId, setItemId] = useState(0);
    const colors = useColors();
    console.log(colors)
    const iconSymbol = (category: string) => {
        console.log(category)
        let icon = '';
        switch(category) {
            case 'NONE':
                icon = 'cash'
                break;
            case 'FOOD':
                icon = 'food-apple';
                break;
            case 'DRINKS':
                icon ='cup'
                break;
            case 'TOYS':
                icon = 'toy-brick';
                break;
            case 'BEAUTY':
                icon = 'lipstick';
                break;
            case 'GROCERIES':
                icon = 'cart';
                break;
            case 'ELECTRONICS':
                icon = 'television-classic'
                break;
            case 'APPAREL':
                icon = 'hanger';
                break;
            case 'HOUSEHOLD':
                icon = 'broom';
                break;
        }
        return <List.Icon icon={icon} color={colors.text}/>
    }

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${IPAddress}/item/getItems?groupId=${params.groupId}`,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsdWthc0B3ZWJlci5jb20iLCJleHAiOjE2OTAwNjc2MDQsImlhdCI6MTY4OTE2NjQyN30.k5pzJO3GLynmsuc5UH0uId2guY9u5phm7t2rI8L6hf8'
        }
    };

    let getUsers = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${IPAddress}/group/getUsers?groupId=${params.groupId}`,
        headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsdWthc0B3ZWJlci5jb20iLCJleHAiOjE2OTAwNjc2MDQsImlhdCI6MTY4OTE2NjQyN30.k5pzJO3GLynmsuc5UH0uId2guY9u5phm7t2rI8L6hf8'
        }
    }


    useEffect(() => {
        axios.request(config)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        axios.request(getUsers)
            .then(res => {
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    const deleteItem = (selectedItem: number) => {
        axios.delete(`${IPAddress}/item/deleteItem?itemId=${selectedItem}&groupId=${params.groupId}`,{
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsdWthc0B3ZWJlci5jb20iLCJleHAiOjE2OTAwNjc2MDQsImlhdCI6MTY4OTE2NjQyN30.k5pzJO3GLynmsuc5UH0uId2guY9u5phm7t2rI8L6hf8'
            }
        })
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const addItem = () => {
        axios.post(`${IPAddress}/group/1/item?itemName=lippenstift&itemCategory=BEAUTY`,{
            headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsdWthc0B3ZWJlci5jb20iLCJleHAiOjE2OTAwNjc2MDQsImlhdCI6MTY4OTE2NjQyN30.k5pzJO3GLynmsuc5UH0uId2guY9u5phm7t2rI8L6hf8'
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <>
            <View>
                <View style={styles.container}>
                {users.map((user: User)=> (
                    <View style={{margin: 2}}>
                        <Avatar.Text label={(user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase()} size={40} style={{backgroundColor: user.iconColor ?? 'green'}} />
                    </View>
                        ))
                }
                </View>
                { data.length === 0 ? (
                    <View style={{alignContent: 'center'}}>
                        <Text variant="headlineMedium" style={{color: colors.text}} >No items</Text>
                    </View>
                    ) :
                <>
                {data.map((item: Item) => (
                    <>
                      <List.Item title={item.itemName} description={item.id} titleStyle={{color: colors.text}}
                                 left={() => iconSymbol(item.category)}
                                 right={() => <Button
                                     color={colors.button}
                                     onPress={() => {
                                     const selectedItemId = item.id;
                                     deleteItem(item.id)
                                 }}>click me</Button>}
                                 />
                        <Divider />
                    </>
                    ))}
                </>
                }
                <Button onPress={() => router.replace('groupScreen')}>Back</Button>

                <Button style={{position:'absolute', top: 200, left: 0}} onPress={() => addItem()}>asdf</Button>
            </View>
        </>
    );
};

export default GroupView;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginRight: 10
    }
})