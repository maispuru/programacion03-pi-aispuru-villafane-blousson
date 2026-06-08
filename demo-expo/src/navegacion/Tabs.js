import { View, Text, Pressable,StyleSheet  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

function Tabs(){
return (
   <NavigationContainer>
     <Tab.Navigator>

     </Tab.Navigator>
   </NavigationContainer>
)
}
export default Tabs;
