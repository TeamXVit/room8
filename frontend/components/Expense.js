import { 
    View, 
    Text, 
    StyleSheet, 
    Pressable, 
    Alert 
} from "react-native";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Expense({ item, fontsLoaded }) {
    const [userData, setUserData] = useState("");
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("Paid");
    
    const hasFetchedData = useRef(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const token = await AsyncStorage.getItem("jwt-token");
                const parsed = JSON.parse(token);

                if (!token) {
                    Alert.alert("Error", "Token not found");
                    return;
                }

                const response = await axios.get("http://192.168.137.1:8000/profile/data", {
                    headers: {
                        Authorization: `Bearer ${parsed}`,
                        "Content-Type": "application/json"
                    }
                });

                setUserData(response.data);
                setLoading(false);
            } catch (err) {
                Alert.alert("Error", "Failed to fetch user data");
                setLoading(false);
            }
        };

        if (!hasFetchedData.current) {
            fetchUserData();
            hasFetchedData.current = true;
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={[styles.title, fontsLoaded && { fontFamily: "Poppins_500Medium" }]}>
                    {item.title}
                </Text>
                <Text style={[styles.meta, fontsLoaded && { fontFamily: "Poppins_400Regular" }]}>
                    By: {item.createdBy}
                </Text>
            </View>
            <Text style={[styles.amount, fontsLoaded && { fontFamily: "Poppins_500Medium" }]}>
                ₹{item.amount}
            </Text>
            {item?.shares && item?.shares.length > 0 && (
                <View style={styles.sharesContainer}>
                    <Text style={styles.shareHeader}>Share Breakdown:</Text>
                    {item?.shares.map((share, index) => (
                        <View key={index} style={styles.shareItem}>
                            <Text style={[styles.shareText, fontsLoaded && { fontFamily: "Poppins_400Regular" }]}>
                                {share?.email}: ₹{share?.shareAmount}
                            </Text>
                            {userData.email === share?.email && (
                                <Pressable 
                                    onPress={() => setText("Done")}
                                    style={styles.paidButton}
                                    disabled={text === "Done"}
                                >
                                    <Text style={styles.paidButtonText}>{text}</Text>
                                </Pressable>
                            )}
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 15,
        backgroundColor: "#dff7e2",
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "90%",
        marginHorizontal: "auto",
        borderWidth: 1,
        borderColor: "#d1d1d1"
    },
    textContainer: {
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        color: "#333",
        marginBottom: 5,
    },
    meta: {
        fontSize: 12,
        color: "#666",
    },
    amount: {
        fontSize: 18,
        color: "#00a97f",
        marginTop: 10,
        fontWeight: "bold",
    },
    sharesContainer: {
        marginTop: 10,
        width: "100%",
    },
    shareHeader: {
        fontSize: 14,
        fontFamily: "Poppins_500Medium",
        color: "#333",
        marginBottom: 5,
    },
    shareItem: {
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    shareText: {
        fontSize: 14,
        color: "#333",
    },
    paidButton: {
        backgroundColor: "#00d09e",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    paidButtonText: {
        color: "honeydew",
        fontSize: 13,
    },
});
