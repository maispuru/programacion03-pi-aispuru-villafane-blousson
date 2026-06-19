import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import { Camera, CameraView } from 'expo-camera'
import { manipulateAsync } from 'expo-image-manipulator'


function Camara(props) {
    const [permisos, setPermisos] = useState(false)
    const [uri, setUri] = useState(null)
    let metodosCamara = useRef(null)


 useEffect(() => {
        Camera.requestCameraPermissionsAsync()
        .then(() => setPermisos(true))
        .catch(error => console.log(error))
    }, [])

function takePicture(){
 metodosCamara.current.takePictureAsync()
 .then((imgTemp) => {
  return manipulateAsync(imgTemp.uri, [{ resize: { width: 1000} }], { compress: 0.7, base64:true });
 })
 .then((imgManipulated)=> {
  setUri(imgManipulated.base64);
 })
 .catch(error => console.log(error))
}

function savePhoto(){
  props.setPhotoUri(uri)
}

function clearPhoto(){
  setUri(null)
}


return (
  <View style={styles.container}>
    {
      !permisos ?
        <View>
          <Text>Necesitas dar permisos para usar la camara</Text>
        </View>
        :
        uri?
        <View>
        <Image style={styles.preview}
        source={ {uri:`data:image/png;base64,${uri}`} }/>
        <View style={styles.buttonArea}>
       <Pressable onPress={()=> savePhoto()}>
       <Text>Aceptar</Text>
    </Pressable>
       <Pressable onPress={()=> clearPhoto()}>
         <Text>Rechazar</Text>
       </Pressable>
      </View>
     </View>

      :
      <View style={styles.container} >
      <CameraView 
       style={styles.camara} 
       facing='back' 
       ref={metodosCamara}  />
      <Pressable 
      style={styles.shootButton}
      onPress={()=> takePicture()}>
         <Text>Sacar foto</Text>
     </Pressable>
</View>
      }
  </View>
)


}


const styles = StyleSheet.create({
    container: {
        flex: 4,  
    },
    camara:{
        flex: 20,
    },
   shootButton:{
        flex: 1,
   },
   preview:{
    width:300,
    height:300
   }
});

export default Camara