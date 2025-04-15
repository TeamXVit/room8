import {
    Alert,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function ChoreScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });
    const [chores, setChores] = useState([]);

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium
    });

    const fetchChores = async () => {
        try {
            const token = await AsyncStorage.getItem("jwt-token");
            const roomid = await AsyncStorage.getItem("roomID");
            const parsedToken = token?.startsWith('"') ? JSON.parse(token) : token;
            const parsedRoomID = roomid?.startsWith('"') ? JSON.parse(roomid) : roomid;

            const response = await axios.get(`http://192.168.137.1:8000/chore/${parsedRoomID}`, {
                headers: { Authorization: `Bearer ${parsedToken}` }
            });

            setChores((response.data || []).map(chore => ({ ...chore, completed: false })));
        } catch (error) {
            console.error("Failed to fetch chores:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchChores();
    }, []);

    const handleCreateChore = async () => {
        try {
            const token = await AsyncStorage.getItem("jwt-token");
            const roomid = await AsyncStorage.getItem("roomID");
            const parsedToken = token?.startsWith('"') ? JSON.parse(token) : token;
            const parsedRoomID = roomid?.startsWith('"') ? JSON.parse(roomid) : roomid;

            const payload = {
                roomid: parsedRoomID,
                title: formData.title,
                description: formData.description
            };

            const response = await axios.post("http://192.168.137.1:8000/chore/create", payload, {
                headers: { Authorization: `Bearer ${parsedToken}` }
            });

            console.log("Chore created:", response.data);
            resetForm();
            setModalVisible(false);
            await fetchChores();
        } catch (e) {
            console.error("Error creating chore:", e.response?.data || e.message);
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: ""
        });
    };

    const toggleChoreCompletion = (index) => {
        const updatedChores = [...chores];
        updatedChores[index].completed = !updatedChores[index].completed;
        setChores(updatedChores);
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.topContainer}>
                <View style={styles.topTextContainer}>
                    <Text style={{ color: "honeydew", fontSize: 18, fontFamily: "Poppins_400Regular", textAlign: "center" }}>Today's chores duty:</Text>
                    <Text style={{ color: "honeydew", fontSize: 37, fontFamily: "Poppins_500Medium", textAlign: "center" }}>Sajid</Text>
                    <Text style={{ color: "honeydew", fontSize: 12, fontFamily: "Poppins_400Regular", textAlign: "center" }}>Credibility Score: 100</Text>
                </View>
            </View>
            <ScrollView style={styles.bottomContainer} contentContainerStyle={{ paddingVertical: 30, alignItems: "center" }}>
                {chores.map((chore, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Pressable onPress={() => toggleChoreCompletion(index)}>
                                <MaterialIcons
                                    name="task-alt"
                                    size={22}
                                    color={chore.completed ? "green" : "black"}
                                />
                            </Pressable>
                            <Text
                                style={{
                                    fontFamily: "Poppins_500Medium",
                                    fontSize: 16,
                                    textDecorationLine: chore.completed ? "line-through" : "none",
                                    color: chore.completed ? "gray" : "black",
                                }}
                            >
                                {chore.title}
                            </Text>
                        </View>
                        <View style={styles.choreList}>
                            <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 14 }}>
                                {chore.description}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <Pressable style={styles.addExpense} onPress={() => setModalVisible(true)}>
                <FontAwesome name="plus" size={24} color="honeydew" />
            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 20, marginVertical: 10 }}>Add New Chore</Text>
                        <TextInput
                            placeholder="Title"
                            value={formData.title}
                            onChangeText={(text) => setFormData({ ...formData, title: text })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Description"
                            value={formData.description}
                            onChangeText={(text) => setFormData({ ...formData, description: text })}
                            style={styles.input}
                        />
                        <View style={{ flexDirection: "row", width: "95%", justifyContent: "space-between" }}>
                            <Pressable style={styles.button} onPress={() => { setModalVisible(false); resetForm(); }}>
                                <Text style={{ color: "honeydew" }}>Cancel</Text>
                            </Pressable>
                            <Pressable style={styles.button} onPress={handleCreateChore}>
                                <Text style={{ color: "honeydew" }}>Add</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
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
        height: "33%",
        justifyContent: "center",
    },
    bottomContainer: {
        height: "67%",
        width: "100%",
        backgroundColor: "honeydew",
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
    },
    topTextContainer: {
        marginHorizontal: "auto",
        marginVertical: "auto"
    },
    card: {
        width: "90%",
        backgroundColor: "#dff7e2",
        borderRadius: 35,
        marginBottom: 15,
        padding: 15
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 5
    },
    choreList: {
        gap: 10
    },
    addExpense: {
        position: "absolute",
        bottom: 15,
        right: 20,
        width: 45,
        height: 45,
        backgroundColor: "#00d09e",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: "80%",
        margin: 20,
        backgroundColor: "honeydew",
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
        alignItems: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 15,
    },
    input: {
        height: 40,
        width: "95%",
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        backgroundColor: "#dff7e2",
        fontFamily: "Poppins_400Regular"
    },
    button: {
        backgroundColor: "#00d09e",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        alignItems: "center",
        fontFamily: "Poppins_400Regular"
    },
});
