import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';


function Post(props) {


    return(
        <View style={styles.container}>
        <Text style={styles.email}>{props.post.data.owner}</Text>
        <Text>{props.post.data.descripcion}</Text>
        <Image
            source={{ uri: props.post.data.imagen }}
            style={styles.image}
        />
         <Pressable onPress={() => props.navigation.navigate('ComentarPosteo', { id: props.post.id })}>
                <Text style={styles.boton}>Comentar</Text>
        </Pressable>

    
        </View>
    )


}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
    },
    email: {
        fontWeight: 'bold',
    }, 
    image: {
        height: 400,
    },
    boton: {
        color: 'green',
    },
});


export default Post
