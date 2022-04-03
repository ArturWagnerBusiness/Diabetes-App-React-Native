import { React } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { COLOR } from "../pallet";

export default function CardOptions(props) {
  return (
    <>
      <FAB
        style={{
          fontSize: 12,
          backgroundColor: COLOR.COMPLEMENTARY,
          marginRight: 10,
        }}
        small
        icon="delete"
        onPress={() => {
          props.setDeleteId(props.itemId);
          props.setDeleteOpen(true);
        }}
      />
      <FAB
        style={{
          fontSize: 12,
          backgroundColor: props.editMode ? COLOR.COMPLEMENTARY : COLOR.PRIMARY,
        }}
        small
        icon={props.editMode ? "close" : "pencil"}
        onPress={() => {
          props.setEditMode(!props.editMode); // Flipping the state of editMode
        }}
      />
    </>
  );
}
