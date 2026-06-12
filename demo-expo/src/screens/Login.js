import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { auth } from '../firebase/config';

function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                props.navigation.navigate('Home')
            }
        })
    }, [])

    function changeEmail(text) {
        setEmail(text)
    }
    function changePassword(text) {
        setPassword(text)
    }

    function onSubmit() {
        auth.signInWithEmailAndPassword(email, password)
        .then(response => {
            props.navigation.navigate('Home')
        })
        .catch(error => {
            setError(error.message)
        })
    }

    return (
        <View>
            <Text>Login</Text>
            <TextInput
                keyboardType='email-address'
                placeholder='email'
                onChangeText={text => changeEmail(text)}
                value={email} />
            <TextInput
                placeholder='contraseña'
                secureTextEntry={true}
                onChangeText={text => changePassword(text)}
                value={password} />
            <Text>{error}</Text>
            <Pressable onPress={() => onSubmit()}>
                <Text>Ingresar</Text>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate('Register')}>
                <Text>No tengo cuenta</Text>
            </Pressable>
        </View>
    )
}

export default Login;