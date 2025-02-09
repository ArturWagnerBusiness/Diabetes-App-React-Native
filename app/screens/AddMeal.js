import React from "react";
import { Text, View } from "react-native";
import { Button, FAB, TextInput } from "react-native-paper";
import ItemContext from "../contexts/ItemContext";
import { COLOR } from "../pallet";

let defaultStyle = {
  margin: 5,
  marginTop: 15,
};

export default function AddMeal({ navigation }) {
  const storage = React.useContext(ItemContext);
  const [name, setName] = React.useState("");
  const [carbo, setCarbo] = React.useState("");
  const CURRENT_TIME = new Date();
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <FAB
            small
            style={{ margin: 8, backgroundColor: COLOR.MEAL }}
            icon="food"
          />
        </>
      ),
    });
  });
  return (
    <View>
      <TextInput
        style={{
          ...defaultStyle,
        }}
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={{
          ...defaultStyle,
        }}
        label="Carbohydrates*"
        value={carbo}
        onChangeText={(text) => setCarbo(text)}
        right={<TextInput.Affix text="grams" />}
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
          if (carbo === "") {
            alert(
              "Please fill required fields (Carbohydrates field) or cancel form"
            );
          } else {
            try {
              storage.create({
                type: "meal",
                name,
                value: carbo,
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
        on ({CURRENT_TIME.toDateString()}){" "}
      </Text>
    </View>
  );
}
