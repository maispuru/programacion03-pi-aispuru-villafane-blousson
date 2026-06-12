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

        db.collection('users').where('email', '==', auth.currentUser.email).onSnapshot(docs => {
             docs.forEach(doc => {
                setUserName(doc.data().userName);
            });
        })
    }
,[])

 function logout() {
        auth.signOut()
          .then(() => props.navigation.navigate('Login'))
           .catch(e => console.log(e));
    }

return(
    <View>
        <Text>Mi Perfil</Text>
        <Text>Usuario: {Username}</Text>
        <Text>Email: {auth.currentUser.email}</Text>
        <FlatList
            data ={Posteos}
            keyExtractor={(item) => item.id.toString()}
            renderItem = {({ item }) => <Post post={item} navigation={props.navigation} />}>
        </FlatList> 
          <Pressable onPress={() => logout()}>
                <Text>Cerrar sesión</Text>
           </Pressable>

    </View>
)


}
export default Profile