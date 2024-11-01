import { View, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

export default function Cancel() {
  return (
    <View>
      <FontAwesomeIcon style={Style.cancelBtn} icon={faXmark} size={24} />
    </View>
  );
}

const Style = StyleSheet.create({
  cancelBtn: {
    color: "white",
  },
});
