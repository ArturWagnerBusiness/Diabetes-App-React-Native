import React from "react";
import { Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import ItemContext from "../contexts/ItemContext";
import { COLOR } from "../pallet";

let defaultStyle = {
  margin: 5,
  marginTop: 15,
};

export default function AddExercise({ navigation }) {
  const storage = React.useContext(ItemContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const CURRENT_TIME = new Date();
  return (
    <View>
      <TextInput
        style={{
          ...defaultStyle,
        }}
        label="Name*"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={{
          ...defaultStyle,
        }}
        label="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Button
        style={{
          ...defaultStyle,
          padding: 15,
        }}
        color={COLOR.PRIMARY}
        mode="contained"
        onPress={() => {
          // Checking if required fields are filled
          if (name === "") {
            alert("Please fill required fields (Name field) or cancel form");
          } else {
            try {
              storage.create({
                type: "activity",
                name,
                description,
              });
            } catch (e) {}
            navigation.pop();
          }
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
        Will be logged at{" "}
        {CURRENT_TIME.getHours() < 10
          ? `0${CURRENT_TIME.getHours()}`
          : CURRENT_TIME.getHours()}
        :
        {CURRENT_TIME.getMinutes() < 10
          ? `0${CURRENT_TIME.getMinutes()}`
          : CURRENT_TIME.getMinutes()}{" "}
        on {CURRENT_TIME.toLocaleDateString()}
      </Text>
    </View>
  );
}
