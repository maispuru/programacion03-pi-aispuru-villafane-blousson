import React, { useEffectEvent } from "react";
import { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { auth } from '../Firebase/config';


function Profile(props) {
    const [Posteos, setPosteos] = useState([]);
    const [Username, setUserName] = useState ('')
    

    useEffect(() => {
       db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(docs => {
         let posts = [];
         docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
         setPosteos(posts);
       })
    }
,[])




}