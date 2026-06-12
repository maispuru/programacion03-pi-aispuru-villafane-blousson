import React from "react";
import { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { db, auth } from '../Firebase/config';

function Register(props) {
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    function changeEmail(text) {
        setEmail(text)
    }
    function changeName(text) {
        setUserName(text)
    }
    function changePassword(text) {
        setPassword(text)
    }

    function onSubmit() {
        auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
            return db.collection('users').add({
                userName: userName,
                email: email
            })
        })
        .then(() => {
            props.navigation.navigate('Login')
        })
        .catch(error => {
            setError(error.message)
        })
    }

    return (
        <View>
            <Text>Registro</Text>
            <TextInput
                keyboardType='email-address'
                placeholder='email'
                onChangeText={text => changeEmail(text)}
                value={email} />
            <TextInput
                placeholder='nombre de usuario'
                onChangeText={text => changeName(text)}
                value={userName} />
            <TextInput
                placeholder='contraseña'
                secureTextEntry={true}
                onChangeText={text => changePassword(text)}
                value={password} />
            <Text>{error}</Text>
            <Pressable onPress={() => onSubmit()}>
                <Text>Registrarse</Text>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate('Login')}>
                <Text>Ya tengo cuenta</Text>
            </Pressable>
        </View>
    )
}



export default Register;