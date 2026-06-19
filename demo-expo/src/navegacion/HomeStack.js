import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import ComentarPosteo from '../screens/ComentarPosteo';

const Stack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeFeed" component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name="ComentarPosteo" component={ComentarPosteo} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}

export default HomeStackScreen;