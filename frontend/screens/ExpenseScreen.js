import { 
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import Expense from "../components/Expense";

export default function ExpenseScreen() {
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
                <Text style={{ color: "white", fontSize: 20, fontFamily: "Poppins_500Medium", marginTop: 35, marginRight: "60%" }}>Expenses</Text>
                <View style={styles.expenseContainer}>
                    <View>
                        <Text>Yours</Text>
                        <Text style={{ color: "white", fontSize: 24, fontFamily: "Poppins_500Medium" }}>500</Text>
                    </View>
                    <View style={styles.divider}></View>
                    <View>
                        <Text>Total</Text>
                        <Text style={{ color: "white", fontSize: 24, fontFamily: "Poppins_500Medium" }}>2500</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: "black", width: 200, height: 25, marginHorizontal: "auto", borderRadius: 25 }}>
                    <View style={{ backgroundColor: "white", height: 25, borderRadius: 25, width: `${500/2500 * 100}%` }}></View>
                </View>
                <Text style={{ color: "white", marginTop: 10, textAlign: "center" }}>You contribute to {500/2500 * 100}% of the total expenses</Text>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={{ marginTop: 15, fontSize: 20, fontFamily: "Poppins_500Medium", textAlign: "center" }}>History</Text>
                <FlatList 
                    style={{ width: "100%" }}
                    data={Array(7)}
                    renderItem={Expense}
                />
            </View>
        </SafeAreaView>
    )
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
        backgroundColor: '#e0e0e0',
    },
});