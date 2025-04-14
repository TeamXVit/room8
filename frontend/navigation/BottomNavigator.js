import HomeScreen from "../screens/HomeScreen";
import ExpenseScreen from "../screens/ExpenseScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChoreScreen from "../screens/ChoreScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";


const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
                tabBarIcon: ((focused) => {
                    return <Entypo name="home" size={24} color={"black"} />
                })
            }}
            />
            <Tab.Screen 
            name="Expenses" 
            component={ExpenseScreen} 
            options={{
                tabBarIcon: ((focused) => {
                    return <FontAwesome5 name="money-bill-alt" size={24} color={"black"} />
                })
            }}
            />
            <Tab.Screen 
            name="Chores" 
            component={ChoreScreen} 
            options={{
                tabBarIcon: ((focused) => {
                    return <FontAwesome5 name="broom" size={24} color="black" />
                })
            }}
            />
            <Tab.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{
                tabBarIcon: ((focused) => {
                    return <AntDesign name="user" size={24} color="black" />
                })
            }}
            />
        </Tab.Navigator>
    )
}