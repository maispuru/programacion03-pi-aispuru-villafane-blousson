import { View, Text, Pressable,StyleSheet  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ComentarPosteo from '../screens/ComentarPosteo';

import Tab from '../navegacion/Tabs';
const Stack = createNativeStackNavigator();

function Stacks(){
return (
<NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={ Login } />
        <Stack.Screen name="ComentarPosteo" component={ ComentarPosteo } />
        <Stack.Screen name="Tab" component={ Tab } />
    </Stack.Navigator>
</NavigationContainer>
)
}
export default Stacks;
