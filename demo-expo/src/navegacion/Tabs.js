import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import HomeStackScreen from './HomeStack';
import CreatePost from '../screens/CreatePost';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

function Tabs(){
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} options={ { tabBarIcon: () => <FontAwesome name="bank" size={24} color="black" /> }}/>
            <Tab.Screen name="CreatePost" component={CreatePost} options={{ headerShown: false }} options={ { tabBarIcon: () => <FontAwesome name="android" size={24} color="black" /> }}/>
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} options={ { tabBarIcon: () => <FontAwesome name="code" size={24} color="black" /> }}/>  
        </Tab.Navigator>
    );
}

export default Tabs;