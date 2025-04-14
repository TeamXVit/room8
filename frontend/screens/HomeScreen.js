import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("jwt-token");
            navigation.replace("Login");
        } catch (e) {
            console.log("Error removing token", e);
        }
    };

    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.topContainer}>
                <Text style={{ color: "white", fontSize: 24 }}>Home</Text>
                <Button title="Logout" onPress={handleLogout} />
            </View>
            <View style={styles.outerContainer}>
                {/* Main content here */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        height: "100%",
        backgroundColor: "#0e3e3e",
        alignItems: "center",
    },
    topContainer: {
        height: "25%",
        justifyContent: "center",
        alignItems: "center",
    },
    outerContainer: {
        height: "75%",
        width: "100%",
        backgroundColor: "white",
    },
});
