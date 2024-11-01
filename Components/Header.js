import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import NavBar from "./NavBar";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View>
      <NavBar backgroundColor={"#48657B"} />
      <View style={Style.headerMainView}>
        <TouchableOpacity
          style={Style.headerView}
          onPress={() => navigation.navigate("Tasks")}
        >
          <Text style={Style.headerBtn}>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Style.headerView}
          onPress={() => navigation.navigate("Timer")}
        >
          <Text style={Style.headerBtn}>Timer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  headerMainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerView: {
    backgroundColor: "#48657B",
    width: "50%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerBtn: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
