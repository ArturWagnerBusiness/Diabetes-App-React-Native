import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Card, Title, Paragraph, Chip } from "react-native-paper";
import { COLOR } from "../pallet";
import ItemContext from "../contexts/ItemContext"; // For delete button later

export default function RecordItem(props) {
  // Setting up different return statements depending on the type of item
  if (props.item.type === "meal") {
    // Has id, date, type, name, value
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Chip style={styles.mealchip}>Meal</Chip>
          <Title>{props.item.name}</Title>
          <Paragraph>{props.item.value} grams</Paragraph>
        </Card.Content>
      </Card>
    );
  } else if (props.item.type === "medication") {
    // Has id, date, type, name
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Chip style={styles.medicationchip}>Medication</Chip>
          <Title>
            {/* If med name is "Fiasp", display "Fiasp (Short/Fast acting)" else display the "Tresiba" option */}
            {props.item.name === "Fiasp"
              ? "Fiasp (Short/Fast acting)"
              : "Tresiba (Long/Slow acting)"}
          </Title>
        </Card.Content>
      </Card>
    );
  } else if (props.item.type === "activity") {
    // Has id, date, type, name, description
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Chip style={styles.activitychip}>Activity</Chip>
          <Title>{props.item.name}</Title>
          <Paragraph>{props.item.description}</Paragraph>
        </Card.Content>
      </Card>
    );
  } else if (props.item.type === "blood_sugar") {
    // Has id, date, type, value, activity, challenge
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Chip style={styles.bloodsugarchip}>Blood Sugar</Chip>
          <Title>{props.item.value} mmol/L</Title>
          {/* Displaying Activity or Challenge only if provided */}
          {props.item.activity !== "" ? (
            <Paragraph>Activity: {props.item.activity}</Paragraph>
          ) : null}
          {props.item.challenge !== "" ? (
            <Paragraph>Challenge: {props.item.challenge}</Paragraph>
          ) : null}
        </Card.Content>
      </Card>
    );
  } else if (props.item.type === "challenge") {
    // Has id, date, type, description
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Chip style={styles.challengechip}>Challenge</Chip>
          <Title>New Issue/Challenge</Title>
          <Paragraph>{props.item.description}</Paragraph>
        </Card.Content>
      </Card>
    );
  } else {
    console.log("Undefined Item Type"); // Logging if item does not have an accepted item type
  }
}

// Default values for the chip tags
const defaultChip = { position: "absolute", right: 3, top: 3, fontSize: 12 };

const styles = StyleSheet.create({
  card: {
    margin: 8,
    padding: 3,
  },
  mealchip: {
    ...defaultChip,
    backgroundColor: COLOR.MEAL,
  },
  medicationchip: {
    ...defaultChip,
    backgroundColor: COLOR.MEDICATION,
  },
  activitychip: {
    ...defaultChip,
    backgroundColor: COLOR.ACTIVITY,
  },
  bloodsugarchip: {
    ...defaultChip,
    backgroundColor: COLOR.BLOOD_SUGAR,
  },
  challengechip: {
    ...defaultChip,
    backgroundColor: COLOR.CHALLENGE,
  },
});
