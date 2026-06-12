import React from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState, useEffect } from "react";
import { db, auth } from "../Firebase/config";
import firebase from 'firebase';

function Likes(props) {
    const currentUser = auth.currentUser;
    const { id, descripcionPost, owner, likes = []} = props.data;
    const [mlike, setMlike] = useState("");
    const [mdlike, setMdlike] = useState("");
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
            .doc(id)
            .update({
                likes: yaLikeo
                    ? firebase.firestore.FieldValue.arrayRemove(currentUser.email)
                    : firebase.firestore.FieldValue.arrayUnion(currentUser.email)
            })
            .then(() => {
                setMlike(yaLikeo ? "Like" : "Quitar Like");
            });
    }
    return (
        <View style={styles.card}>
            <Text style={styles.mensaje}>{descripcionPost}</Text>
            <Text style={styles.autor}>{owner}</Text>
            <Text>{cantidadLike}</Text>
            <Pressable onPress={onSubmitLike}>
                <Text>{mlike}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({});
export default Likes;