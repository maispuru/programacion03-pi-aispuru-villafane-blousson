import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput,StyleSheet } from 'react-native';
import { auth } from '../Firebase/config';

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
            props.navigation.navigate('Tab')
        })
        .catch(error => {
            setError(error.message)
        })
    }

    return (
    <View style={styles.container}>
        <View style={styles.card}>
            <Text style={styles.titulo}>Login</Text>
            <TextInput
                style={styles.input}
                keyboardType='email-address'
                placeholder='email'
                onChangeText={text => changeEmail(text)}
                value={email}
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
                <Text style={styles.textoBoton}>Ingresar</Text>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate('Register')}>
                <Text style={styles.link}>No tengo cuenta</Text>
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
        borderColor: '#dbdbdb',
        padding: 20,
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
export default Login;