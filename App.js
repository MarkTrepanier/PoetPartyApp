import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import WordGenScreen from "./app/screens/WordGenScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>PoetPartyApp</Text>
      <WordGenScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
