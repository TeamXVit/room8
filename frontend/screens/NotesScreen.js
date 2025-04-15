import {
    Alert,
    Modal,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView
} from "react-native";
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function NoteScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium
    });

    const fetchNotes = async () => {
        try {
            const token = await AsyncStorage.getItem("jwt-token");
            const roomid = await AsyncStorage.getItem("roomID");
            const parsedToken = token?.startsWith('"') ? JSON.parse(token) : token;
            const parsedRoomID = roomid?.startsWith('"') ? JSON.parse(roomid) : roomid;

            const response = await axios.get(`http://192.168.137.1:8000/roomnote/${parsedRoomID}`, {
                headers: { Authorization: `Bearer ${parsedToken}` }
            });

            setNotes(response.data || []);
        } catch (e) {
            console.error("Error fetching notes:", e.response?.data || e.message);
        }
    };

    const handleCreateNote = async () => {
        try {
            const token = await AsyncStorage.getItem("jwt-token");
            const roomid = await AsyncStorage.getItem("roomID");
            const parsedToken = token?.startsWith('"') ? JSON.parse(token) : token;
            const parsedRoomID = roomid?.startsWith('"') ? JSON.parse(roomid) : roomid;

            const payload = {
                roomid: parsedRoomID,
                content: content
            };

            const response = await axios.post("http://192.168.137.1:8000/roomnote/create", payload, {
                headers: { Authorization: `Bearer ${parsedToken}` }
            });

            console.log("Note created:", response.data);
            setModalVisible(false);
            setContent("");
            await fetchNotes();
        } catch (e) {
            console.error("Error creating note:", e.response?.data || e.message);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.topContainer}>
                <Text style={{ fontSize: 28, color: "honeydew", fontFamily: "Poppins_500Medium", textAlign: "center" }}>
                    Share Notes With Your Roommates
                </Text>
            </View>

            <ScrollView style={styles.bottomContainer} contentContainerStyle={{ padding: 20 }}>
                {notes.map((note, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 14 }}>{note.content}</Text>
                    </View>
                ))}
            </ScrollView>

            <Pressable style={styles.addNoteButton} onPress={() => setModalVisible(true)}>
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
                        <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 20, marginVertical: 10 }}>Add Room Note</Text>
                        <TextInput
                            placeholder="Type your note"
                            value={content}
                            onChangeText={setContent}
                            style={styles.input}
                            multiline
                        />
                        <View style={{ flexDirection: "row", width: "95%", justifyContent: "space-between" }}>
                            <Pressable style={styles.button} onPress={() => { setModalVisible(false); setContent(""); }}>
                                <Text style={{ color: "honeydew" }}>Cancel</Text>
                            </Pressable>
                            <Pressable style={styles.button} onPress={handleCreateNote}>
                                <Text style={{ color: "honeydew" }}>Send</Text>
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
        paddingHorizontal: 20
    },
    bottomContainer: {
        height: "67%",
        width: "100%",
        backgroundColor: "honeydew",
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
    },
    card: {
        width: "100%",
        backgroundColor: "#dff7e2",
        borderRadius: 20,
        padding: 15,
        marginBottom: 15
    },
    addNoteButton: {
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
        height: 80,
        width: "95%",
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: "#dff7e2",
        fontFamily: "Poppins_400Regular",
        textAlignVertical: "top"
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
