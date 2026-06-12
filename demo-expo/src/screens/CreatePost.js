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
        <View style={styles.container}> 
            <Text>Nuevo Post</Text>
              <TextInput
              style={styles.input}
              placeholder='Escribí una descripción'
              onChangeText={(texto)=> setDescripcion(texto)}
              value={descripcion}
              />
              <Pressable onPress={() => crearPosteo()}>
                <Text style={styles.boton} >Publicar</Text>
            </Pressable>
        </View>
  }  </View>  
    )
}  

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        margin: 10,
    },
    boton: {
        color: 'green',
    },
});

export default CreatePost;