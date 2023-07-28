import React, {useState} from 'react';
import {DefaultTheme, Provider, Text, TextInput} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import {useColorScheme, View} from "react-native";
import {useColors} from "../../constants/Colors";
import {ThemeProvider} from "@react-navigation/native";
import {DarkTheme} from "../../components/ReactNativePaperTheme";

const AddItem = () => {

    const colorScheme = useColorScheme();
    // const colortheme = useTheme();
    const colors = useColors();

    const [itemName, setItemName] = useState();
    const [itemCategory, setItemCategory] = useState();
    const [showDropDown, setShowDropDown] = useState(false);
    const dropdownCategories = [
        {label: 'FOOD', value: 'food'},
        {label: 'DRINKS', value: 'drinks'},
        {label: 'TOYS', value: 'toys'},
        {label: 'BEAUTY', value: 'beauty'},
        {label: 'GROCERIES', value: 'groceries'},
        {label: 'ELECTRONIC', value: 'electronic'},
        {label: 'APPAREL', value: 'apparel'},
        {label: 'HOUSEHOLD', value: 'household'},
        {label: 'NONE', value: 'none'}
        ];

    return (
        <>
            <Text>add item</Text>
            <TextInput placeholder={'gesundheit'}/>
            <View>
            {/*<DropDown*/}
            {/*    visible={showDropDown}*/}
            {/*    onDismiss={() => setShowDropDown(false)}*/}
            {/*    showDropDown={() => setShowDropDown(true)}*/}
            {/*    value={itemCategory}*/}
            {/*    setValue={setItemCategory}*/}
            {/*    list={dropdownCategories} />*/}
            </View>
        </>
    );
};

export default AddItem;