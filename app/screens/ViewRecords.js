import { useEffect, useState, useContext } from "react";
import { FAB, Modal, Portal, Provider } from "react-native-paper";
import { Text, FlatList } from "react-native";
import ItemContext from "../contexts/ItemContext";
import RecordItem from "../components/RecordItem";

export default function ViewRecords({ navigation }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const { state } = useContext(ItemContext);

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
            }}
          />
        </>
      ),
    });
  });

  return (
    <>
      <FlatList
        data={state}
        keyExtractor={(e) => e.id.toString()}
        renderItem={({ item }) => {
          return <RecordItem item={item} />;
        }}
      />
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
