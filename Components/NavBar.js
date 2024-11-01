import { StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/core";

export default function NavBar(props) {
  const Focused = useIsFocused();

  return Focused ? <StatusBar animated={true} {...props} /> : null;
}
