import { View, Text, Pressable,StyleSheet  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Perfil from '../screens/Profile';
import CreatePost from '../screens/CreatePost';
import Profile from '../screens/Profile';


const Tab = createBottomTabNavigator();

function Tabs(){
return (
  
     <Tab.Navigator>
        <Tab.Screen name="Home" component={ Home } />
        <Tab.Screen name="CreatePost" component={ CreatePost } />
        <Tab.Screen name="Profile" component={ Profile } />  

     </Tab.Navigator>

)
}
export default Tabs;
