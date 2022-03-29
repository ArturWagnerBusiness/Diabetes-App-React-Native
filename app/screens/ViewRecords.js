import { useEffect, useState } from "react";
import { Text } from "react-native";
import { FAB, Modal, Portal, Provider } from "react-native-paper";
import ItemContext from "../contexts/ItemContext";

export default function ViewRecords({ navigation }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <FAB
            style={{ margin: 8 }}
            small
            icon="cog"
            onPress={() => {
              setSettingsOpen(true);
              console.log(storage.state);
            }}
          />
        </>
      ),
    });
  });

  return (
    <>
      <Provider>
        <Portal>
          <Modal
            visible={isSettingsOpen}
            onDismiss={() => setSettingsOpen(false)}
            contentContainerStyle={{
              backgroundColor: "white",
              padding: 20,
            }}
          >
            <Text>Example Modal. Click outside this area to dismiss.</Text>
          </Modal>
        </Portal>
      </Provider>
      <Provider>
        <Portal>
          <FAB.Group
            open={isMenuOpen}
            icon={isMenuOpen ? "close" : "plus"}
            actions={[
              {
                icon: "food",
                label: "Add Meal",
                onPress: () => navigation.navigate("Meal"),
              },
              {
                icon: "needle",
                label: "Add Medication",
                onPress: () => navigation.navigate("Medication"),
              },
              {
                icon: "emoticon-neutral-outline",
                label: "Add Issue/Challange",
                onPress: () => navigation.navigate("Issue"),
              },
              {
                icon: "water",
                label: "Add Blood Sugar Level",
                onPress: () => navigation.navigate("BloodSugar"),
              },
              {
                icon: "run",
                label: "Add Activity/Exercise",
                onPress: () => navigation.navigate("Exercise"),
              },
              {
                icon: "magnify",
                label: "Search food",
                onPress: () => console.log("Open popup"),
              },
            ]}
            onStateChange={({ open }) => {
              setMenuOpen(open);
            }}
            onPress={() => {
              setSettingsOpen(false);
            }}
          />
        </Portal>
      </Provider>
    </>
  );
}
