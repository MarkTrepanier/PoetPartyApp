import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/AntDesign"

import WordGenScreen from "./app/screens/WordGenScreen";
import PaddleScreen from "./app/screens/PaddleScreen";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      
      <Tab.Navigator  style={{backgroundColor:'red'}}
      initialRouteName="WordGen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
  
          if (route.name === 'WordGen') {
            iconName = focused
              ? 'form'
              : 'form';
          } else if (route.name === 'Paddle') {
            iconName = focused ? 'flag' : 'flag';
          }
  
          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'grey',
        justifyContent:"flex-start",
        tabBarStyle:{
          backgroundColor:'#f4f4f4',
        }
      })}
      >
        <Tab.Screen
          name="WordGen"
          component={WordGenScreen}
          options={{ title: "WordGenn"}}
        />
        <Tab.Screen
          name="Paddle"
          component={PaddleScreen}
          options={{ title: "Paddle", }}
        />
      </Tab.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
