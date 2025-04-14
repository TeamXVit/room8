import { 
    Alert,
    Pressable,
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TextInput, 
    View 
} from "react-native";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Poppins_500Medium } from "@expo-google-fonts/poppins";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";


export default function LoginScreen({ navigation, onLoginSuccess }) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    let [fontsLoaded] = useFonts({
        Poppins_500Medium,
    });
    
    if (!fontsLoaded) {
        return null;
    };

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
    };      

    const handleLogin = () => {
        axios.post("http://192.168.137.1:8000/profile/login", formData)
        .then(async (res) => {
            await AsyncStorage.setItem("jwt-token", JSON.stringify(res.data.token));
            if (onLoginSuccess) {
                onLoginSuccess(res.data.token); 
            } else {
                navigation.replace("Option"); 
            }
        })
        .catch((e) => Alert.alert("Login Failed", "Please check your credentials."));
    };
    

    const handlePasswordVisibilty = () => {
        setPasswordVisibility(!passwordVisibility)
    };

    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Login</Text>
            </View>
            <View style={styles.outerContainer}>
                <View style={{ width: "80%" }}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Enter your email id"
                        value={formData.email}
                        onChangeText={(text) => handleInputChange("email", text)}
                    />
                </View>
                <View style={{ width: "80%" }}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.textInput}>
                    <TextInput 
                        style={{ width: "90%" }}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChangeText={(text) => handleInputChange("password", text)}
                        secureTextEntry={!passwordVisibility}
                    />
                        <Pressable onPress={handlePasswordVisibilty}>
                            {passwordVisibility ? <Entypo name="eye" size={24} color="black" /> : <Entypo name="eye-with-line" size={24} color="black" /> }
                        </Pressable>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable 
                        style={{ backgroundColor: "#0e3e3e", width: 150, borderRadius: 20, }}
                        onPress={handleLogin}
                        disabled={!formData.email || !formData.password}
                    >
                        <Text style={{ marginVertical: 7, marginHorizontal: "auto", color: "white", fontSize: 18 }}>Login</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={{ fontFamily: "Poppins_500Medium" }}>Forgot Password ?</Text>
                    </Pressable>
                </View>
                <View>
                    <Text style={{ textAlign: "center" }}>or sign up with</Text>
                    <View style={{ marginVertical: 15, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 25 }}>
                        <Pressable>
                            <AntDesign name="google" size={36} color="black" />
                        </Pressable>
                        <Pressable>
                            <FontAwesome5 name="facebook" size={36} color="black" />
                        </Pressable>
                    </View>
                    <Text>Don't have an account? Sign up</Text>
                </View>
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
    textContainer: {
        width: "100%",
        height: "25%",
        paddingY: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontFamily: "Poppins_500Medium",
        fontSize: 30,
        color: "#dff7e2"
    },
    outerContainer: {
        width: "100%",
        height: "75%",
        backgroundColor: "honeydew",
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
        paddingTop: 55,
        display: "flex",
        alignItems: "center",
        gap: 20
    },
    inputLabel: {
        fontFamily: "Poppins_500Medium",
        fontSize: 17
    },
    textInput: {
        fontFamily: "Poppins_500Medium",
        backgroundColor: "#dff7e2",
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    buttonContainer: {
        marginVertical: 25,
        display: "flex",
        alignItems: "center",
        gap: 15
    },
    endContainer: {
        marginVertical: 25,
        display: "flex",
        gap: 5
    }
})