import { React } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { COLOR } from "../pallet";

export default function CardOptions(props) {
  return (
    <FAB
      style={styles.deletefab}
      small
      icon="delete"
      onPress={() => {
        props.setDeleteId(props.itemId);
        props.setDeleteOpen(true);
      }}
    />
  );
}

const styles = StyleSheet.create({
  deletefab: {
    fontSize: 12,
    backgroundColor: COLOR.COMPLEMENTARY,
  },
});
