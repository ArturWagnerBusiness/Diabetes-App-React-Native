import { useEffect, useState } from "react";
import { FAB, Portal, Provider } from "react-native-paper";

export default function ViewRecords({ navigation }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <FAB
            style={{ margin: "8px" }}
            small
            icon="cog"
            onPress={() => {
              setSettingsOpen(!isSettingsOpen);
            }}
          />
        </>
      ),
    });
  });

  return (
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
            if (isMenuOpen) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
}
