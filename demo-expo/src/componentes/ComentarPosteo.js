import React from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState, useEffect } from "react";
import { db, auth } from "../Firebase/config";
import firebase from 'firebase';
function ComentarPosteo(props) {
    const { id, descripcionPost, email, likes = [], disLikes = [],createdAt, userName } = props.data;
    const cantidadLike = likes.length;
    const nombreCreador = userName
    const horaCreado = createdAt



    return(
        <View>
            <Text>{nombreCreador} posteo a las{horaCreado}</Text>
            <Text>{cantidadLike}</Text>
        </View>
    )
}
export default ComentarPosteo;