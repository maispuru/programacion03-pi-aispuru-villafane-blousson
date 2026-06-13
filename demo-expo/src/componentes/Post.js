
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
        <Text>{props.post.data.descripcion}</Text>
        <Image
            source={ {uri:`data:image/png;base64,${props.post.data.photo}`} }
            style={styles.image}
        />
        <Text>{cantidadLike}</Text>
        <Pressable onPress={onSubmitLike}>
                <Text>{mlike}</Text>
        </Pressable>
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
