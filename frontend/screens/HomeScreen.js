import { 
    Image,
    Pressable,
    SafeAreaView, 
    ScrollView,
    StyleSheet, 
    Text, 
    View 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Poppins_400Regular, Poppins_500Medium } from "@expo-google-fonts/poppins";
import Feather from "@expo/vector-icons/Feather";
import Foundation from '@expo/vector-icons/Foundation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import barchart from ".././assets/barchart.png";

export default function HomeScreen() {
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
                <View style={styles.innerTopContainer1}>
                    <View>
                        <Text style={{ color: "honeydew", fontSize: 18, fontFamily: "Poppins_500Medium" }}>Hi! Welcome back</Text>
                    </View>
                    <Pressable style={{ backgroundColor: "honeydew", padding: 5, borderRadius: 50 }}>
                        <Feather name="bell" size={21} color="black" />
                    </Pressable>
                </View>
                <Text style={{ marginHorizontal: "auto", marginVertical: "auto", fontFamily: "Poppins_500Medium", color: "honeydew", fontSize: 40 }}>MH3 802-A</Text>
            </View>
            <ScrollView style={styles.bottomContainer} contentContainerStyle={{ paddingVertical: 30 }} >
                <View style={styles.card}>
                    <View style={{ flexDirection: "row", gap: 15, width: "90%", marginHorizontal: "auto", marginVertical: 10, justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Foundation name="home" size={24} color="black" />
                            <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 16 }}>MH3 802-A</Text>
                        </View>
                        <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>3000</Text>
                    </View>
                    <View style={{ flexDirection: "column", height: "65%", gap: 10 }}>
                        <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-between", marginHorizontal: "auto" }}>
                            <Text style={{ fontSize: 16, fontFamily: "Poppins_400Regular" }}>Total Room Expenses</Text>
                            <Text style={{ fontSize: 16, fontFamily: "Poppins_400Regular" }}>2500</Text>
                        </View>
                        <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-between", marginHorizontal: "auto" }}>
                            <Text style={{ fontSize: 16, fontFamily: "Poppins_400Regular" }}>Amount you owe</Text>
                            <Text style={{ fontSize: 16, fontFamily: "Poppins_400Regular" }}>500</Text>
                        </View>
                        <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-between", marginHorizontal: "auto" }}>
                            <Text style={{ fontSize: 16, fontFamily: "Poppins_400Regular" }}>Amount you're owed</Text>
                            <Text style={{ fontSize: 16, fontFamily: "Poppins_400Regular" }}>750</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={{ flexDirection: "row", gap: 15, width: "90%", marginHorizontal: "auto", marginVertical: 10 }}>
                        <MaterialIcons name="trending-up" size={24} color="black" />
                        <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 16 }}>Monthly Expense Trend</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Image source={barchart} style={{ height: 95, width: "100%", resizeMode: "contain" }} />
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={{ flexDirection: "row", gap: 15, width: "90%", marginHorizontal: "auto", marginVertical: 10 }}>
                        <MaterialCommunityIcons name="broom" size={24} color="black" />
                        <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 16 }}>Today's chores: Hari Prasath</Text>
                    </View>
                    <View style={{ justifyContent: "space-between", height: "65%" }}>
                        <Text style={{ fontSize: 16, fontFamily: "Poppins_400Regular", marginLeft: 18 }}>👉🏼 Do the dishes</Text>
                        <Text style={{ fontSize: 16, fontFamily: "Poppins_400Regular", marginLeft: 18 }}>👉🏼 Get bags from laundry</Text>
                        <Text style={{ fontSize: 16, fontFamily: "Poppins_400Regular", marginLeft: 18 }}>👉🏼 Clean balcony</Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={{ flexDirection: "row", gap: 15, width: "90%", marginHorizontal: "auto", marginVertical: 10 }}>
                        <FontAwesome name="user" size={24} color="black" />
                        <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 16 }}>Roommate's score</Text>
                    </View>
                    <View style={{ justifyContent: "space-between", height: "65%" }}>
                        <View style={{ width: "90%", marginHorizontal: "auto", flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 16, fontFamily: "Poppins_400Regular" }}>⭐ You</Text>
                            <Text>10</Text>
                        </View>
                        <View style={{ width: "90%", marginHorizontal: "auto", flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 16, fontFamily: "Poppins_400Regular" }}>⭐ You</Text>
                            <Text>10</Text>
                        </View>
                        <View style={{ width: "90%", marginHorizontal: "auto", flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 16, fontFamily: "Poppins_400Regular" }}>⭐ You</Text>
                            <Text>10</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
        paddingTop: 40
    },
    innerTopContainer1: {
        marginVertical: 10,
        width: "85%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },  
    bottomContainer: {
        flex: 1,
        height: "70%",
        width: "100%",
        backgroundColor: "honeydew",
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
        gap: 15
    },
    card: {
        width: "90%",
        height: 155,
        backgroundColor: "#dff7e2",
        borderRadius: 35,
        marginHorizontal: "auto",
        marginBottom: 15
    },
});
