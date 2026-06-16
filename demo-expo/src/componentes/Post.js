
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react'
import { auth } from '../Firebase/config';
import firebase from 'firebase';
import { db } from '../Firebase/config';


function Post(props) {
    const currentUser = auth.currentUser;
    const { likes = []} = props.post.data;
    const postId = props.post.id;
    const [mlike, setMlike] = useState("");
    const cantidadLike = likes.length;
    useEffect(() => {
        if (likes.includes(currentUser.email)==true) {
            setMlike("Quitar Like");
        } else {
            setMlike("Like");
        }
    }, []);
    function onSubmitLike() {
        const yaLikeo = likes.includes(currentUser.email);
        db.collection('posts')
            .doc(postId)
            .update({
                likes: yaLikeo
                    ? firebase.firestore.FieldValue.arrayRemove(currentUser.email)
                    : firebase.firestore.FieldValue.arrayUnion(currentUser.email)
            })
            .then(() => {
                setMlike(yaLikeo ? "Like" : "Quitar Like");
            });
        
    }

    return(
    <View style={styles.container}>
        <Text style={styles.email}>{props.post.data.owner}</Text>
        <Text style={styles.descripcion}>{props.post.data.descripcion}</Text>
        <Image
            source={{uri:`data:image/png;base64,${props.post.data.photo}`}}
            style={styles.image}
        />
        <View style={styles.likesContainer}>
            <Text style={styles.likes}>{cantidadLike} likes</Text>
        </View>
        <View style={styles.botonesContainer}>
            <Pressable onPress={onSubmitLike}>
                <Text style={styles.botonLike}>{mlike}</Text>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate('ComentarPosteo', { id: props.post.id })}>
                <Text style={styles.botonComentar}>Comentar</Text>
            </Pressable>
        </View>
    </View>
    )


}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 10,
        borderWidth: 1,
        borderColor: '#dbdbdb',
        borderRadius: 12,
        padding: 12,
    },

    email: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#262626',
        marginBottom: 8,
    },

    descripcion: {
        fontSize: 14,
        color: '#262626',
        marginBottom: 10,
    },

    image: {
        height: 400,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#eee',
        marginBottom: 10,
    },

    likesContainer: {
        marginBottom: 8,
    },

    likes: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#262626',
    },

    botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },

    botonLike: {
        color: '#262626',
        fontWeight: 'bold',
        fontSize: 14,
    },

    botonComentar: {
        color: '#3897f0',
        fontWeight: 'bold',
        fontSize: 14,
    },
});


export default Post
