import React from "react";
import { View, Text, StyleSheet, Pressable, TextInput, FlatList } from 'react-native';
import { useState, useEffect } from "react";
import { db, auth } from "../Firebase/config";
import firebase from 'firebase';


function ComentarPosteo(props) {
    const { id } = props.route.params;
    const [post, setPost] = useState(null);
    const [comentario, setComentario] = useState('');
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
    if (post === null) {
        return (
            <View style={styles.cargando}>
                <Text>Cargando...</Text>
            </View>
        );
    }
    const comentarios = post.comentarios
    const cantidadLike = post.likes.length;
    return (
    <View style={styles.container}>
        <View style={styles.card}>
            <Text style={styles.owner}>{post.owner}</Text>
            <Text style={styles.descripcion}>{post.descripcion}</Text>
            <Text style={styles.likes}>{cantidadLike} likes</Text>
            <FlatList
                data={comentarios}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.comentarioCard}>
                        <Text style={styles.comentarioEmail}>{item.email}</Text>
                        <Text style={styles.comentarioTexto}>{item.texto}</Text>
                    </View>
                )}
            />
            <TextInput
                style={styles.input}
                placeholder='Comentá acá tu post...'
                onChangeText={(texto) => setComentario(texto)}
                value={comentario}
                multiline={true}
            />
            <Pressable 
                style={styles.boton}
                onPress={() => publicarComentario()}
            >
                <Text style={styles.textoBoton}>Publicar comentario</Text>
            </Pressable>
        </View>
    </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 20,
        paddingTop: 20,
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

    owner: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#262626',
        marginBottom: 6,
    },

    descripcion: {
        fontSize: 15,
        color: '#262626',
        marginBottom: 12,
    },

    likes: {
        fontSize: 14,
        fontWeight: '600',
        color: '#262626',
        textAlign: 'right',
        marginBottom: 14,
    },

    comentarioCard: {
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: '#dbdbdb',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },

    comentarioEmail: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 4,
    },

    comentarioTexto: {
        fontSize: 14,
        color: '#262626',
    },

    input: {
        height: 90,
        borderWidth: 1,
        borderColor: '#bdbdbd',
        borderRadius: 6,
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 12,
        marginBottom: 14,
        textAlignVertical: 'top',
    },

    boton: {
        backgroundColor: '#b9ecff',
        borderWidth: 1,
        borderColor: '#6bb7d6',
        borderRadius: 18,
        paddingVertical: 12,
        alignItems: 'center',
    },

    textoBoton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#262626',
    },

    cargando: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    }
});
export default ComentarPosteo;