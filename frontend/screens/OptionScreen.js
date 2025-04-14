import { 
    Image,
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
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import image from "../assets/optionscreenimg.png";
import image2 from "../assets/optionscreenimg2.png"


export default function OptionScreen({ navigation }) {
    const [choice, setChoice] = useState(null);
    const [roomCode, setRoomCode] = useState("");
    const [formData, setFormData] = useState({
        roomid: "",
        address: ""
    })

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium
    });
    
    if (!fontsLoaded) {
        return null;
    };

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
    }; 

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem("jwt-token");
          return jsonValue != null ? JSON.parse(jsonValue) : null
        } catch (e) {
          console.log(e);
        }
    };

    const token = getData();

    const handleBackNavigation = () => {
        choice !== "" ? setChoice("") : navigation.replace("Login")
    };

    const handleCreateRoom = () => {
        axios.post("http://192.168.137.1:8000/room/create", formData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(async (res) => {
            console.log(res.data);
            await AsyncStorage.setItem("roomID", res.data);
        })
        .catch((e) => console.log(e))
    };

    const handleJoinRoom = () => {
        axios.post("http://192.168.137.1:8000/room/request", { roomid: roomCode }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(async (res) => {
            console.log(res.data);
            await AsyncStorage.setItem("roomID", res.data);
        })
        .catch((e) => console.log(e))
    };

    return (
        <SafeAreaView style={styles.pageContainer}>
            <Pressable style={{ position: "fixed", top: 35, right: "39%" }} onPress={handleBackNavigation}>
                <Text style={{ color: "white", fontSize: 15, fontFamily: "Poppins_500Medium" }}>{choice !== "" ? "Back" : "Login"}</Text>
            </Pressable>
            <View style={styles.topContainer}>
                <Text style={{ color: "white", fontSize: 34, fontFamily: "Poppins_500Medium" }}>
                    {choice === "Join" ? "Join A Room" : choice === "Create" ? "Create A Room" : "Room8"}
                </Text>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={{ marginHorizontal: "auto", width: "70%", fontSize: 23, fontFamily: "Poppins_400Regular", textAlign: "center" }}>
                    {choice === "Join" ? "Enter Room Code" : choice === "Create" ? "Create A Room" : "Thank you for choosing Room8"}
                </Text>
                {choice === "Join" ?
                <View style={{ marginHorizontal: "auto", width: "70%", marginTop: 25 }}> 
                    <TextInput 
                        placeholder="Room Code"
                        style={styles.textInput}
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                    />
                    <Pressable 
                        style={{ backgroundColor: "#052224", paddingHorizontal: 20, paddingVertical: 7, width: 170, borderRadius: 25, marginHorizontal: "auto", marginTop: 20 }}
                        onPress={handleJoinRoom}
                    >
                        <Text style={{ color: "honeydew", textAlign: "center", fontSize: 16, fontFamily: "Poppins_400Regular" }}>Proceed</Text>
                    </Pressable>
                </View>
                : 
                choice === "Create" ?
                <View style={{ marginHorizontal: "auto", marginVertical: 18, display: "flex", gap: 15, width: "70%", }}>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Enter the name of your room"
                        value={formData.roomid}
                        onChange={(text) => handleInputChange("roomid", text)}
                    />
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="Enter the address of your room"
                        value={formData.address}
                        onChange={(text) => handleInputChange("address", text)}
                    />
                    <Pressable 
                        style={{ backgroundColor: "#052224", paddingHorizontal: 15, paddingVertical: 7, width: 170, borderRadius: 25, marginHorizontal: "auto", marginTop: 20 }}
                        onPress={handleCreateRoom}
                    >
                        <Text style={{ color: "honeydew", textAlign: "center", fontSize: 16, fontFamily: "Poppins_400Regular" }}>Proceed</Text>
                    </Pressable>
                </View>
                :
                <View style={styles.buttonContainer}>
                    <Pressable 
                        style={{ backgroundColor: "#052224", paddingHorizontal: 20, paddingVertical: 7, width: 170, borderRadius: 25 }}
                        onPress={() => setChoice("Create")}
                    >
                        <Text style={{ color: "honeydew", textAlign: "center", fontSize: 16, fontFamily: "Poppins_400Regular" }}>Create A Room</Text>
                    </Pressable>
                    <Pressable 
                        style={{ backgroundColor: "#0e3e3e", paddingHorizontal: 20, paddingVertical: 7, width: 170, borderRadius: 25 }}
                        onPress={() => setChoice("Join")}
                    >
                        <Text style={{ color: "honeydew", textAlign: "center", fontSize: 16, fontFamily: "Poppins_400Regular" }}>Join A Room</Text>
                    </Pressable>
                </View>}
                <Image 
                    source={choice === "Join" ? image2 : choice === "Create" ? null : image} 
                    style={{ width: 160, height: 160, marginVertical: "auto", marginHorizontal: "auto" }}
                />
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
    },
    textInput: {
        fontFamily: "Poppins_500Medium",
        backgroundColor: "#dff7e2",
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
})