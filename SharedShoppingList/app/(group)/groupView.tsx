import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {Avatar, Button, Divider, List, Text} from "react-native-paper";
import {useLocalSearchParams, useNavigation, useRouter} from "expo-router";
// import {colorTheme} from "../constants/Colors";
import axios from "axios";
import {IPAddress} from "../../constants/IPAddress";
import {useColors} from "../../constants/Colors";
import {useAuth} from "../AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";

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
    const {authState} = useAuth();
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
            'Authorization': `Bearer ${authState?.token}`
        }
    };

    let getUsers = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${IPAddress}/group/getUsers?groupId=${params.groupId}`,
        headers: {
        'Authorization': `Bearer ${authState?.token}`
        }
    }


    useEffect(() => {
        console.log(authState?.token)
        axios.request(config)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            });
        axios.request(getUsers)
            .then(res => {
                console.log("res:" + res)
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    const deleteItem = (selectedItem: number) => {
        axios.delete(`${IPAddress}/item/deleteItem?itemId=${selectedItem}&groupId=${params.groupId}`,{
            headers: {
                'Authorization': `Bearer ${authState?.token}`
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
            'Authorization': `Bearer ${authState?.token}`
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <>
            <View>
                <View style={styles.container}>
                {users.map((user: User, index)=> (
                    <View style={index !== 0 ? {margin: 2, marginRight: -20} : {marginRight: 10}} >
                        <Avatar.Text label={(user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase()} size={40} style={{backgroundColor: user.iconColor ?? 'green'}} />
                    </View>
                        ))
                }
                </View>
                { data.length === 0 ? (
                    <View style={{alignContent: 'center'}}>
                        <Text variant="headlineMedium" style={{color: colors.text, textAlign: 'center'}} >No items</Text>
                        <Button onPress={() => router.push({pathname: 'addItem', params: {groupId: params.groupId}})}>Add item</Button>
                    </View>
                    ) :
                <>
                {data.map((item: Item) => (
                    <>
                        <Divider />
                      <List.Item title={item.itemName} titleStyle={{color: colors.text}}
                                 style={{paddingLeft: 20}}
                                 left={() => iconSymbol(item.category)}
                                 right={() => <Button
                                     style={{paddingRight: -10}}
                                     onPress={() => {
                                     deleteItem(item.id)
                                 }}><FontAwesome name={'trash'} size={25} style={{paddingTop: 10}} color={colors.delete} /></Button>}
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
        marginBottom: 10,
        marginTop: 10
    }
})