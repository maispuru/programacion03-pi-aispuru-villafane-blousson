import React from "react";
import { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

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
    <View style={styles.container}>
        <View style={styles.card}>
            <Text style={styles.titulo}>Registro</Text>
            <TextInput
                style={styles.input}
                keyboardType='email-address'
                placeholder='email'
                onChangeText={text => changeEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder='nombre de usuario'
                onChangeText={text => changeName(text)}
                value={userName}
            />
            <TextInput
                style={styles.input}
                placeholder='contraseña'
                secureTextEntry={true}
                onChangeText={text => changePassword(text)}
                value={password}
            />
            <Text style={styles.error}>{error}</Text>
            <Pressable style={styles.boton} onPress={() => onSubmit()}>
                <Text style={styles.textoBoton}>Registrarse</Text>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate('Login')}>
                <Text style={styles.link}>Ya tengo cuenta</Text>
            </Pressable>
        </View>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        justifyContent: 'start',
        padding: 10,
        marginTop: 100,
    },

    card: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderRadius: 18,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },

    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#262626',
        textAlign: 'center',
        marginBottom: 25,
    },

    input: {
        borderWidth: 1,
        borderColor: '#dbdbdb',
        backgroundColor: '#fafafa',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 14,
    },

    error: {
        color: 'red',
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 10,
    },

    boton: {
        backgroundColor: '#3897f0',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 5,
    },

    textoBoton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },

    link: {
        color: '#3897f0',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 18,
        fontSize: 14,
    },
});



export default Register;