import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ExpenseScreen from "../screens/ExpenseScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChoreScreen from "../screens/ChoreScreen";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";


const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
    return (
        <Tab.Navigator 
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "honeydew",
                    height: 60,
                },
                tabBarButton: (props) => (
                    <TouchableOpacity
                        {...props}
                        activeOpacity={1} 
                    />
                )
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="home" size={size} color={color} />
                    ),
                    tabBarActiveTintColor: "#00d09e",
                    tabBarInactiveTintColor: "black"
                }}
            />
            <Tab.Screen 
                name="Expenses" 
                component={ExpenseScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="money-bill-alt" size={size} color={color} />
                    ),
                    tabBarActiveTintColor: "#00d09e",
                    tabBarInactiveTintColor: "black"
                }}
            />
            <Tab.Screen 
                name="Chores" 
                component={ChoreScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="broom" size={size} color={color} />
                    ),
                    tabBarActiveTintColor: "#00d09e",
                    tabBarInactiveTintColor: "black"
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" size={size} color={color} />
                    ),
                    tabBarActiveTintColor: "#00d09e",
                    tabBarInactiveTintColor: "black"
                }}
            />
        </Tab.Navigator>

    )
}