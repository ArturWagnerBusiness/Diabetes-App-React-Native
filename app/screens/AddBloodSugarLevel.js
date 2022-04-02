import React from "react";
import { Text, View } from "react-native";
import { Button, Checkbox, TextInput } from "react-native-paper";
import ItemContext from "../contexts/ItemContext";
import { COLOR } from "../pallet";

let defaultStyle = {
  margin: 5,
  marginTop: 15,
};

export default function AddBloodSugarLevel({ navigation }) {
  const storage = React.useContext(ItemContext);
  const [value, setValue] = React.useState("");
  const [activity, setActivity] = React.useState(null);
  const [challenge, setChallenge] = React.useState(null);
  const CURRENT_TIME = new Date();
  return (
    <View>
      <TextInput
        style={{
          ...defaultStyle,
        }}
        label="Measurement"
        value={value}
        onChangeText={(text) => setValue(text)}
        right={<TextInput.Affix text="mg/dl" />}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Checkbox
          status={activity === null ? "unchecked" : "checked"}
          onPress={() => {
            setActivity(activity === null ? "" : null);
          }}
        />
        <Text>Add Activity/Exercise</Text>
      </View>

      <TextInput
        style={{
          ...defaultStyle,
          display: activity === null ? "none" : "flex",
        }}
        label="Description"
        value={activity}
        onChangeText={(text) => setActivity(text)}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Checkbox
          status={challenge === null ? "unchecked" : "checked"}
          onPress={() => {
            setChallenge(challenge === null ? "" : null);
          }}
        />
        <Text>Add Issue/Challenge</Text>
      </View>
      <TextInput
        style={{
          ...defaultStyle,
          display: challenge === null ? "none" : "flex",
        }}
        label="Description"
        value={challenge}
        onChangeText={(text) => setChallenge(text)}
      />
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
              type: "meal",
              value,
              activity: typeof activity === "string" ? activity : "",
              challenge: typeof challenge === "string" ? challenge : "",
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
