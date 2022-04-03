import React from "react";
import { StyleSheet } from "react-native";
import { Card, Title, Paragraph, Chip, FAB } from "react-native-paper";
import { COLOR } from "../pallet";
import CardOptions from "./CardOptions";

/**
 *
 * @param {{
 *   item: Entry
 *   setEditorObject: (value: Entry) => void
 *   setEditorValue: (value: any) => void
 *   setEditorInput: (value: string) => void
 *   setEditorOpen: (value: boolean) => void
 * }} props
 * @returns
 */
export default function RecordItem(props) {
  function LoggedDateTime() {
    let itemDate = new Date(props.item.date);
    return (
      <Paragraph>
        Recorded at{" "}
        {itemDate.getHours() < 10
          ? `0${itemDate.getHours()}`
          : itemDate.getHours()}
        :
        {itemDate.getMinutes() < 10
          ? `0${itemDate.getMinutes()}`
          : itemDate.getMinutes()}{" "}
        on ({itemDate.toDateString()}){" "}
      </Paragraph>
    );
  }

  let FabObj = (fabProps) => {
    return editMode ? (
      <FAB
        small
        style={{
          width: 40,
          height: 40,
        }}
        icon="pencil"
        onPress={() => {
          props.setEditorObject(props.item);
          props.setEditorValue(fabProps.name);
          props.setEditorInput(props.item[fabProps.name]);
          props.setEditorOpen(true);
        }}
      />
    ) : null;
  };
  const [editMode, setEditMode] = React.useState(false);
  // Setting up different return statements depending on the type of item
  if (props.item.type === "meal") {
    // Has id, date, type, name, value
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Chip style={styles.mealchip}>Meal</Chip>
          <Title>{props.item.value} grams</Title>
          <FabObj name="value" />

          <Paragraph>{props.item.name}</Paragraph>
          <FabObj name="name" />
          <LoggedDateTime />
        </Card.Content>
        <Card.Actions>
          <CardOptions
            itemId={props.item.id}
            setDeleteOpen={props.setDeleteOpen}
            setDeleteId={props.setDeleteId}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        </Card.Actions>
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
            {/* Does not need a Fab for editing data, as the entry can easily be remade*/}
          </Title>
          <LoggedDateTime />
        </Card.Content>
        <Card.Actions>
          <CardOptions
            itemId={props.item.id}
            setDeleteOpen={props.setDeleteOpen}
            setDeleteId={props.setDeleteId}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        </Card.Actions>
      </Card>
    );
  } else if (props.item.type === "activity") {
    // Has id, date, type, name, description
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Chip style={styles.activitychip}>Activity</Chip>
          <Title>{props.item.name}</Title>
          <FabObj name="name" />
          <Paragraph>{props.item.description}</Paragraph>
          <FabObj name="description" />
          <LoggedDateTime />
        </Card.Content>
        <Card.Actions>
          <CardOptions
            itemId={props.item.id}
            setDeleteOpen={props.setDeleteOpen}
            setDeleteId={props.setDeleteId}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        </Card.Actions>
      </Card>
    );
  } else if (props.item.type === "blood_sugar") {
    // Has id, date, type, value, activity, challenge
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Chip style={styles.bloodsugarchip}>Blood Sugar</Chip>
          <Title>{props.item.value} mmol/L</Title>
          <FabObj name="value" />
          {/* Displaying Activity or Challenge only if provided */}
          {props.item.activity !== "" ? (
            <>
              <Paragraph>Activity: {props.item.activity}</Paragraph>
              <FabObj name="activity" />
            </>
          ) : null}
          {props.item.challenge !== "" ? (
            <>
              <Paragraph>Challenge: {props.item.challenge}</Paragraph>
              <FabObj name="challenge" />
            </>
          ) : null}
          <LoggedDateTime />
        </Card.Content>
        <Card.Actions>
          <CardOptions
            itemId={props.item.id}
            setDeleteOpen={props.setDeleteOpen}
            setDeleteId={props.setDeleteId}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        </Card.Actions>
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
          <FabObj name="description" />
          <LoggedDateTime />
        </Card.Content>
        <Card.Actions>
          <CardOptions
            itemId={props.item.id}
            setDeleteOpen={props.setDeleteOpen}
            setDeleteId={props.setDeleteId}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        </Card.Actions>
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
