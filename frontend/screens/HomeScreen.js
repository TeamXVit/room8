import { 
    Pressable,
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";


export default function HomeScreen({ navigation }) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium
    });
    
    if (!fontsLoaded) {
        return null;
    };

    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.topContainer}>
                <Text style={{ color: "white", fontSize: 24, fontFamily: "Poppins_500Medium" }}>Home</Text>
            </View>
            <View style={styles.bottomContainer}>
                
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        height: "100%",
        backgroundColor: "#00d09e",
        alignItems: "center",
    },
    topContainer: {
        height: "30%",
        justifyContent: "center",
        alignItems: "center",
    },
    bottomContainer: {
        height: "70%",
        width: "100%",
        backgroundColor: "honeydew",
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70
    },
});
