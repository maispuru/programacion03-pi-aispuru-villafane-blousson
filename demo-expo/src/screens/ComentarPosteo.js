import React from "react";
import { View, Text, StyleSheet, Pressable, TextInput, FlatList } from 'react-native';
import { useState, useEffect } from "react";
import { db, auth } from "../Firebase/config";
import firebase from 'firebase';


function ComentarPosteo(props) {
    const { id } = props.route.params;
    const [post, setPost] = useState(null);
    const [comentario, setComentario] = useState('');
    const comentarios = post.comentarios
    const cantidadLike = post.likes.length;
    useEffect(() => {
        db.collection('posts').doc(id).onSnapshot(doc => {
            setPost(doc.data());
        });
    }, []);
    function publicarComentario() {
        db.collection('posts')
            .doc(id)
            .update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({
                    email: auth.currentUser.email,
                    texto: comentario,
                    createdAt: Date.now(),
                })
            })
            .then(() => {
                setComentario('');
            })
            .catch(e => console.log(e));
    }

    return (
        <View>
            <Text>{post.owner}</Text>
            <Text>{post.descripcion}</Text>
            <Text>{cantidadLike} likes</Text>
            <FlatList
                data={comentarios}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View >
                        <Text>{item.email}</Text>
                        <Text>{item.texto}</Text>
                    </View>
                )}
            />
            <TextInput
                placeholder='Escribí un comentario'
                onChangeText={(texto) => setComentario(texto)}
                value={comentario}
            />
            <Pressable onPress={() => publicarComentario()}>
                <Text>Publicar comentario</Text>
            </Pressable>
        </View>
    );
}
export default ComentarPosteo;