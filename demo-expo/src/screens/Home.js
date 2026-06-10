import React from "react";
import {useState,useEffect} from 'react'
import { View, Text, Pressable,StyleSheet  } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { db } from '../firebase/config';

const Stack = createNativeStackNavigator();

function Home(){

    const [Posteos, setPosteos] = useState([]);
    
    useEffect(() => {

    })
    return(
        <View> 
            <Text >Home</Text> 
        </View> 
    )
}
export default Home;