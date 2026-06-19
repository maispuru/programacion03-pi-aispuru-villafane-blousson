import React from "react";
import { useState } from 'react'
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { db, auth } from '../Firebase/config';
import Camara from "../componentes/Camara";



function CreatePost(props) {
    const [descripcion, setDescripcion] = useState ('')
    const [photoUri, setPhotoUri] = useState (null)
    
    function crearPosteo( ) {
        db.collection('posts').add({
            owner: auth.currentUser.email,
             descripcion: descripcion,
             likes: [],
             photo: photoUri,
             createdAt: Date.now(),
             
        })
        .then(() => { setDescripcion('');
                  props.navigation.navigate('Home')} 
                )
        .catch(e => console.log(e));    
    }

    return( 
    <View style={styles.container}>   
        {
            photoUri === null ?
            <Camara setPhotoUri={(uri) => setPhotoUri(uri)}/>
            :
            <View style={styles.card}> 
                
                <Text style={styles.titulo}>Nuevo Post</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Escribí una descripción'
                    onChangeText={(texto)=> setDescripcion(texto)}
                    value={descripcion}
                />
                <Pressable style={styles.boton} onPress={() => crearPosteo()}>
                    <Text style={styles.textoBoton}>Publicar</Text>
                </Pressable>
            </View>
        }  
    </View>  
    )
}  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        justifyContent: 'center',
        padding: 20,
    },

    card: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#dbdbdb',
        borderRadius: 12,
        padding: 20,
    },

    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#262626',
        textAlign: 'center',
        marginBottom: 20,
    },

    input: {
        borderWidth: 1,
        borderColor: '#dbdbdb',
        backgroundColor: '#fafafa',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 14,
    },

    boton: {
        backgroundColor: '#3897f0',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },

    textoBoton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export default CreatePost;