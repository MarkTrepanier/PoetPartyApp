import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import WordGenScreen from "./app/screens/WordGenScreen";
import PaddleScreen from "./app/screens/PaddleScreen";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="WordGen">
        <Tab.Screen
          name="WordGen"
          component={WordGenScreen}
          options={{ title: "WordGenn" }}
        />
        <Tab.Screen
          name="Paddle"
          component={PaddleScreen}
          options={{ title: "Paddle" }}
        />
      </Tab.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
