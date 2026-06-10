import { View, Text, Pressable,StyleSheet  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Perfil from '../screens/Profile';
import CreatePost from '../screens/CreatePost';



const Tab = createBottomTabNavigator();

function Tabs(){
return (
   <NavigationContainer>
     <Tab.Navigator>
        <Tab.Navigator name="Home" component={ Home } />
     </Tab.Navigator>
   </NavigationContainer>
)
}
export default Tabs;
//<Tab.Navigator name="Perfil" component={ Perfil } />  
//<Tab.Navigator name="CreatePost" component={ CreatePost } />