import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
                tabBarIcon: ((focused) => {
                    return <Entypo name="home" size={24} color={focused ? "green" : "black"} />
                })
            }}
            />
        </Tab.Navigator>
    )
}