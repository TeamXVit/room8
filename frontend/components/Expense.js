import { 
    StyleSheet,
    Text,
    View 
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


export default function Expense() {
    return (
        <View style={styles.container}>
            <MaterialIcons name="category" size={50} color="black" style={{ marginHorizontal: 10 }} />
            <View style={styles.divider}></View>
            <View style={{ marginLeft: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: "medium" }}>Title</Text>
                <Text style={{ fontSize: 12, }}>Description</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#dff7e2",
        borderRadius: 25,
        height: 85,
        width: "90%",
        marginHorizontal: "auto",
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    divider: {
        width: 1,
        height: 60,
        backgroundColor: "black",
    },
    content: {
        width: "65%",
        textAlign: "left"
    }
})