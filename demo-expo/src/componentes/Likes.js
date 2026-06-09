import React from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState, useEffect } from "react";
import { db, auth } from "../Firebase/config";
import firebase from 'firebase';

function Likes(props) {
    const currentUser = auth.currentUser;
    const { id, descripcionPost, email, likes = [], disLikes = [] } = props.data;
    const [mlike, setMlike] = useState("");
    const [mdlike, setMdlike] = useState("");
    const cantidadLike = likes.length;
    const cantidadDisLike = disLikes.length;
    useEffect(() => {
        if (likes.includes(currentUser.email)==true) {
            setMlike("Quitar Like");
        } else {
            setMlike("Like");
        }
        if (disLikes.includes(currentUser.email)==true) {
            setMdlike("Quitar Dislike");
        } else {
            setMdlike("Dislike");
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
    function onSubmitDisLike() {
        const yaDislikeo = disLikes.includes(currentUser?.email);
        db.collection('posts')
            .doc(id)
            .update({
                disLikes: yaDislikeo
                    ? firebase.firestore.FieldValue.arrayRemove(currentUser.email)
                    : firebase.firestore.FieldValue.arrayUnion(currentUser.email)
            })
            .then(() => {
                setMdlike(yaDislikeo ? "Dislike" : "Quitar Dislike");
            });
    }
    return (
        <View style={styles.card}>
            <Text style={styles.mensaje}>{descripcionPost}</Text>
            <Text style={styles.autor}>{email}</Text>
            <Text>{cantidadLike}</Text>
            <Pressable onPress={onSubmitLike}>
                <Text>{mlike}</Text>
            </Pressable>
            <Text>{cantidadDisLike}</Text>
            <Pressable onPress={onSubmitDisLike}>
                <Text>{mdlike}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({});
export default Likes;