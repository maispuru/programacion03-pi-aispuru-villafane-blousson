import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStack';
import CreatePost from '../screens/CreatePost';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

function Tabs(){
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="CreatePost" component={CreatePost} />
            <Tab.Screen name="Profile" component={Profile} />  
        </Tab.Navigator>
    );
}

export default Tabs;