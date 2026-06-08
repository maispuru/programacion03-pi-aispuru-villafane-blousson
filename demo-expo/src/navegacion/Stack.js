import { View, Text, Pressable,StyleSheet  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';

import Tab from '../navegacion/Tabs';
const Stack = createNativeStackNavigator();

function Stacks(){
return (
<NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="Home" component={ Home } />

        <Stack.Screen name="Tab" component={ Tab } />
    </Stack.Navigator>
</NavigationContainer>
)
}
export default Stacks;
