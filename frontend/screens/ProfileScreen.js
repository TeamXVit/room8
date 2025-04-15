import { 
    Alert,
    Pressable,
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View 
} from "react-native";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";


export default function ProfileScreen() {
    const [userData, setUserData] = useState(null);
    const [loading,  setLoading] = useState(false);
    const hasFetchedData = useRef(false);

    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium
    });

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("jwt-token");
            navigation.replace("Login");
        } catch (e) {
            Alert.alert("Error", "Error removing token");
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const token = await AsyncStorage.getItem("jwt-token");
                const parsed = JSON.parse(token);
                if (!parsed) {
                    Alert.alert("Error", "Token not found");
                    return;
                }
                const response = await axios.get("http://192.168.137.1:8000/profile/data", {
                    headers: { Authorization: `Bearer ${parsed}` }
                });
                setUserData(response.data);
                setLoading(false);
                
            } catch (err) {
                Alert.alert("Error fetching user data:", err);
                setLoading(false);
            }
        };

        if (!hasFetchedData.current) {
            fetchUserData();
            hasFetchedData.current = true;
        }
    }, []);

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.topContainer}>
                <Text style={{ color: "white", fontSize: 20, fontFamily: "Poppins_500Medium" }}>Profile</Text>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.imageContainer}>
                    <Feather name="user" size={44} color="black" />
                </View>
                {loading ? 
                <View style={{ marginTop: 50 }}>
                    {[1,2,3,4,5].map((num) => <View key={num} style={{ width: "90%", height: 75, backgroundColor: "#dff7e2", marginHorizontal: 10, borderRadius: 20, marginVertical: 15  }}></View>)}
                </View>
                : 
                    <>
                    <View style={styles.dataContainer}>
                        <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 17, textAlign: "center", marginBottom: 15 }}>
                            {userData?.name || "User"}
                        </Text>
                        <Text style={styles.dataLabel}>Bio</Text>
                        <Text style={styles.dataContent}>{userData?.bio}</Text>
                        <Text style={styles.dataLabel}>Email</Text>
                        <Text style={styles.dataContent}>{userData?.email}</Text>
                        <Text style={styles.dataLabel}>Phone Number</Text>
                        <Text style={styles.dataContent}>{userData?.phoneno}</Text>
                        <Text style={styles.dataLabel}>Instagram</Text>
                        <Text style={styles.dataContent}>{userData?.instagram}</Text>
                    </View>  
                    <Pressable style={{ marginTop: 25, backgroundColor: "#00d09e", paddingHorizontal: 25, paddingVertical: 5, borderRadius: 20 }} onPress={handleLogout}>
                        <Text style={{ fontFamily: "Poppins_400Regular", color: "honeydew", fontSize: 16 }}>Logout</Text>
                    </Pressable>
                    </>
                }
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
        height: "23%",
        justifyContent: "center",
        alignItems: "center",
    },
    bottomContainer: {
        height: "77%",
        width: "100%",
        backgroundColor: "honeydew",
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
        position: "relative",
        display: "flex",
        alignItems: "center"
    },
    imageContainer: {
        borderRadius: 100,
        height: 100,
        width: 100,
        backgroundColor: "#cccfcd",
        marginHorizontal: "auto",
        position: "absolute",
        top: -50,
        justifyContent: "center",
        alignItems: "center"
    },
    dataContainer: {
        marginTop: 60,
        width: "95%"
    },
    dataLabel: {
        fontFamily: "Poppins_500Medium",
        fontSize: 17,
        marginHorizontal: 25,
    },
    dataContent: {
        backgroundColor: "#dff7e2",
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontFamily: "Poppins_400Regular",
        fontSize: 17,
        marginHorizontal: 25,
        marginVertical: 10,
        borderRadius: 20
    }
});
