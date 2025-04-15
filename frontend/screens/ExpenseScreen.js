import { 
    TextInput,
    FlatList,
    Modal,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Expense from "../components/Expense";
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function ExpenseScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        shares: [] 
    });
    const [expenses, setExpenses] = useState([]);
    const [newShare, setNewShare] = useState({ email: "", shareAmount: "" });

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium
    });

    const resetForm = () => {
        setFormData({
            title: "",
            amount: "",
            shares: []
        });
        setNewShare({ email: "", shareAmount: "" });
    };

    const fetchExpenses = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem("jwt-token");
            const roomid = await AsyncStorage.getItem("roomID");
            const parsedToken = token?.startsWith('"') ? JSON.parse(token) : token;
            const parsedRoomID = roomid?.startsWith('"') ? JSON.parse(roomid) : roomid;

            const response = await axios.get(`http://192.168.137.1:8000/expense/roomexpenses/${parsedRoomID}`, {
                headers: { Authorization: `Bearer ${parsedToken}` }
            });

            setExpenses(response.data);
        } catch (error) {
            console.error("Failed to fetch expenses:", error.response?.data || error.message);
        }
    }, []);    

    const handleCreateExpense = async () => {
        try {
            const token = await AsyncStorage.getItem("jwt-token");
            const roomid = await AsyncStorage.getItem("roomID");
            const parsedToken = token?.startsWith('"') ? JSON.parse(token) : token;
            const parsedRoomID = roomid?.startsWith('"') ? JSON.parse(roomid) : roomid;

            const payload = {
                roomid: parsedRoomID,
                ...formData,
                amount: parseFloat(formData.amount),
                shares: formData.shares.map(share => ({
                    email: share.email,
                    shareAmount: parseFloat(share.shareAmount)
                }))
            };

            const response = await axios.post("http://192.168.137.1:8000/expense/create", payload, {
                headers: { Authorization: `Bearer ${parsedToken}` }
            });

            console.log("Expense created:", response.data);
            resetForm();
            setModalVisible(false);
            await fetchExpenses();
        } catch (e) {
            console.error("Error creating expense:", e.response?.data || e.message);
        }
    };

    const addShare = () => {
        if (newShare.email && newShare.shareAmount) {
            setFormData({
                ...formData,
                shares: [...formData.shares, { email: newShare.email, shareAmount: newShare.shareAmount }]
            });
            setNewShare({ email: "", shareAmount: "" }); 
        }
    };

    const removeShare = (index) => {
        const updatedShares = formData.shares.filter((_, i) => i !== index);
        setFormData({ ...formData, shares: updatedShares });
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.topContainer}>
                <Text style={{ color: "white", fontSize: 20, fontFamily: "Poppins_500Medium", marginTop: 35, marginRight: "60%" }}>Expenses</Text>
                <View style={styles.expenseContainer}>
                    <View>
                        <Text>Yours</Text>
                        <Text style={{ color: "white", fontSize: 24, fontFamily: "Poppins_500Medium" }}>400</Text>
                    </View>
                    <View style={styles.divider}></View>
                    <View>
                        <Text>Total</Text>
                        <Text style={{ color: "white", fontSize: 24, fontFamily: "Poppins_500Medium" }}>1000</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: "black", width: 200, height: 25, marginHorizontal: "auto", borderRadius: 25 }}>
                    <View style={{ backgroundColor: "white", height: 25, borderRadius: 25, width: `${400 / 1000 * 100}%` }}></View>
                </View>
                <Text style={{ color: "white", marginTop: 10, textAlign: "center" }}>You contribute to {400 / 1000 * 100}% of the total expenses</Text>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={{ marginTop: 15, fontSize: 20, fontFamily: "Poppins_500Medium", textAlign: "center" }}>History</Text>
                <FlatList
                    style={{ width: "100%" }}
                    data={expenses}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <Expense item={item} fontsLoaded={fontsLoaded} />}
                />
            </View>
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
                        <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 20, marginVertical: 10 }}>Add New Expense</Text>
                        <TextInput
                            placeholder="Title"
                            value={formData.title}
                            onChangeText={(text) => setFormData({ ...formData, title: text })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Amount"
                            value={formData.amount}
                            onChangeText={(text) => setFormData({ ...formData, amount: text })}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 16, marginVertical: 10 }}>Add Shares</Text>
                        {formData.shares.map((share, index) => (
                            <View
                                key={index}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    paddingVertical: 10,
                                    paddingHorizontal: 15,
                                    marginBottom: 10,
                                    alignItems: 'center', 
                                }}
                            >
                                <Text style={{ flex: 1, color: 'black' }}>{share.email}: ₹{share.shareAmount}</Text>
                                <Pressable onPress={() => removeShare(index)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome name="trash" size={20} color="red" />
                                </Pressable>
                            </View>
                        ))}
                        <TextInput
                            placeholder="Email"
                            value={newShare.email}
                            onChangeText={(text) => setNewShare({ ...newShare, email: text })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Share Amount"
                            value={newShare.shareAmount}
                            onChangeText={(text) => setNewShare({ ...newShare, shareAmount: text })}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <Pressable style={styles.button} onPress={addShare}>
                            <Text style={{ color: "honeydew" }}>Add Share</Text>
                        </Pressable>
                        <View style={{ flexDirection: "row", width: "95%", justifyContent: "space-between" }}>
                            <Pressable style={styles.button} onPress={() => { setModalVisible(false); resetForm(); }}>
                                <Text style={{ color: "honeydew" }}>Cancel</Text>
                            </Pressable>
                            <Pressable style={styles.button} onPress={handleCreateExpense}>
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
    },
    bottomContainer: {
        height: "67%",
        width: "100%",
        backgroundColor: "honeydew",
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
    },
    expenseContainer: {
        marginVertical: 15,
        marginHorizontal: "auto",
        width: "50%",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    divider: {
        width: 1,
        height: 47,
        backgroundColor: 'black',
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
