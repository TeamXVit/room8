import { Button, StyleSheet, Text, View } from "react-native";


export default function HomeScreen({ navigation }) {
    const handleLogout = () => {
        navigation.replace("Login")
    }

    return (
        <View>
            <Text>Home</Text>
            <Button title="Login" onPress={handleLogout} />
        </View>
    )
}