import { View, Button } from "react-native";
import { useState } from "react";

function PaddleScreen(props) {
  const [color, setColor] = useState("blue");
  const changeColor = () => {
    color === "red" ? setColor("blue") : setColor("red");
  };
  return (
    <View
      style={{
        backgroundColor: color,
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <Button title="color" onPress={changeColor} />
    </View>
  );
}

export default PaddleScreen;
