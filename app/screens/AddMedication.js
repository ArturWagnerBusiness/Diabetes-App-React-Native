import React from "react";
import { Text, View } from "react-native";
import { Button, ToggleButton } from "react-native-paper";
import ItemContext from "../contexts/ItemContext";
import { COLOR } from "../pallet";

let defaultStyle = {
  margin: 5,
  marginTop: 15,
};

export default function AddMedication({ navigation }) {
  const storage = React.useContext(ItemContext);
  const [name, setName] = React.useState("Fiasp");
  const CURRENT_TIME = new Date();
  return (
    <View>
      <ToggleButton.Group
        onValueChange={(value) => setName(value)}
        value={name}
      >
        <Text
          style={{
            ...defaultStyle,
            fontSize: 18,
          }}
        >
          Select Fiasp (Short/Fast acting){" "}
          {name === "Fiasp" ? "(Selected)" : ""}
        </Text>
        <ToggleButton
          style={{
            ...defaultStyle,
            marginTop: 0,
            width: "100%",
          }}
          icon="camera-timer"
          value="Fiasp"
        />
        <Text
          style={{
            ...defaultStyle,
            fontSize: 18,
          }}
        >
          Select Tresiba (Long/Slow acting){" "}
          {name === "Tresiba" ? "(Selected)" : ""}
        </Text>
        <ToggleButton
          style={{
            ...defaultStyle,
            marginTop: 0,
            width: "100%",
          }}
          icon="clock-time-two-outline"
          value="Tresiba"
        />
      </ToggleButton.Group>
      <Button
        style={{
          ...defaultStyle,
          padding: 15,
        }}
        color={COLOR.PRIMARY}
        mode="contained"
        onPress={() => {
          try {
            storage.create({
              type: "medication",
              name,
            });
          } catch (e) {}
          navigation.pop();
        }}
      >
        Add record
      </Button>
      <Button
        style={{
          ...defaultStyle,
          padding: 15,
        }}
        color={COLOR.COMPLEMENTARY_LIGHT}
        mode="contained"
        onPress={() => {
          navigation.pop();
        }}
      >
        Cancel
      </Button>
      <Text
        style={{
          ...defaultStyle,
          textAlign: "center",
          fontSize: 20,
        }}
      >
        Will be logged at {CURRENT_TIME.getHours()}:{CURRENT_TIME.getMinutes()}{" "}
        on {CURRENT_TIME.toLocaleDateString()}
      </Text>
    </View>
  );
}
