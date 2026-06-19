import React from "react";
import {useState,useEffect} from 'react'
import { View, Text,StyleSheet, FlatList  } from 'react-native';
import Post from "../componentes/Post";
import { db } from "../firebase/config";


function Home(props){

    const [Posteos, setPosteos] = useState([]);
    
    useEffect(() => {
      db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs => {
         let posts = [];
          docs.forEach(doc => {
            posts.push({
                id: doc.id,
                data: doc.data(),
             })
         })
         setPosteos(posts)

      })

    }, [])
    return(
        <View style ={styles.container}>  
            <View style={styles.flatlist}>
                <FlatList
                data ={Posteos}
                 keyExtractor={(item) => item.id.toString()}
                 renderItem = {({ item }) => <Post post={item} navigation={props.navigation} />}>

                </FlatList> 

            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
     flatlist: {
        width: '100%',
        flex: 1,
    },
});

export default Home; 