import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import ComentarPosteo from '../screens/ComentarPosteo';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="HomeFeed" component={Home} options={{ headerShown: false }}/>
            <HomeStack.Screen name="ComentarPosteo" component={ComentarPosteo} options={{ headerShown: false }}/>
        </HomeStack.Navigator>
    );
}

export default HomeStackScreen;