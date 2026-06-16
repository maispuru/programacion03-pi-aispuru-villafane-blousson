import React, { useEffectEvent } from "react";
import { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';
import { db } from "../firebase/config";
import Post from "../componentes/Post";


function Profile(props) {
    const [Posteos, setPosteos] = useState([]);
    const [Username, setUserName] = useState ('')
    

    useEffect(() => {
       db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(docs => {
         let posts = [];
         docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
         setPosteos(posts);
       })

        db.collection('users').where('email', '==', auth.currentUser.email).onSnapshot(docs => {
             docs.forEach(doc => {
                setUserName(doc.data().userName);
            });
        })
    }
,[])

 function logout() {
        auth.signOut()
          .then(() => props.navigation.navigate('Login'))
           .catch(e => console.log(e));
    }

return(
    <View style={styles.container}>
        <View style={styles.cardPerfil}>
            <Text style={styles.titulo}>Mi Perfil</Text>
            <Text style={styles.textoPerfil}>Usuario: {Username}</Text>
            <Text style={styles.textoPerfil}>Email: {auth.currentUser.email}</Text>
            <Pressable style={styles.botonLogout} onPress={() => logout()}>
                <Text style={styles.textoBoton}>Cerrar sesión</Text>
            </Pressable>
        </View>
        <Text style={styles.subtitulo}>Mis posteos</Text>
        <FlatList 
            style={styles.flatlist}
            data={Posteos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Post post={item} navigation={props.navigation} />}
        />
    </View>
)

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        padding: 15,
    },

    cardPerfil: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#dbdbdb',
        borderRadius: 12,
        padding: 18,
        marginBottom: 18,
    },

    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#262626',
        textAlign: 'center',
        marginBottom: 18,
    },

    textoPerfil: {
        fontSize: 15,
        color: '#262626',
        marginBottom: 8,
    },

    subtitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#262626',
        marginBottom: 10,
    },

    flatlist: {
        width: '100%',
        flex: 1,
    },

    botonLogout: {
        backgroundColor: '#3897f0',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12,
    },

    textoBoton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
});
export default Profile
 