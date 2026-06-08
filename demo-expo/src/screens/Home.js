import React from "react";
import {useState,useEffect} from 'react'
import { View, Text, Pressable,StyleSheet  } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function Home(){
    return(
        <View> 
            <Text >Home</Text> 
        </View> 
    )
}
export default Home;