import { 
    Image,
    Pressable,
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View 
} from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import image from "../assets/optionscreenimg.png"


export default function OptionScreen() {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
    });
    
    if (!fontsLoaded) {
        return null;
    };

    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.topContainer}>
                <Text style={{ color: "white", fontSize: 34 }}>Room8</Text>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={{ marginHorizontal: "auto", width: "70%", fontSize: 23, fontFamily: "Poppins_400Regular", textAlign: "center" }}>Thank you for choosing Room8</Text>
                <View style={styles.buttonContainer}>
                    <Pressable style={{ backgroundColor: "#052224", paddingHorizontal: 20, paddingVertical: 7, width: 170, borderRadius: 25 }}>
                        <Text style={{ color: "honeydew", textAlign: "center", fontSize: 16, fontFamily: "Poppins_400Regular" }}>Create A Room</Text>
                    </Pressable>
                    <Pressable style={{ backgroundColor: "#0e3e3e", paddingHorizontal: 20, paddingVertical: 7, width: 170, borderRadius: 25 }}>
                        <Text style={{ color: "honeydew", textAlign: "center", fontSize: 16, fontFamily: "Poppins_400Regular" }}>Join A Room</Text>
                    </Pressable>
                </View>
                <Image source={image} style={{ width: 160, height: 160, marginVertical: "auto", marginHorizontal: "auto" }}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        height: "100%",
        backgroundColor: "#0e3e3e",
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
        borderTopRightRadius: 70,
        paddingTop: 25
    },
    buttonContainer: {
        marginTop: 45,
        alignItems: "center",
        gap: 10
    }
})