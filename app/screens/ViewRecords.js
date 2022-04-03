import { useEffect, useState, useContext } from "react";
import {
  Button,
  Dialog,
  FAB,
  Modal,
  Portal,
  Provider,
  TextInput,
} from "react-native-paper";
import { Text, FlatList } from "react-native";
import ItemContext from "../contexts/ItemContext";
import RecordItem from "../components/RecordItem";
import FoodSearch from "../components/FoodSearch";
import { COLOR } from "../pallet";

export default function ViewRecords({ navigation }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isFoodSearchOpen, setFoodSearchOpen] = useState(false);
  // Variable to open the entry editor
  const [isEditorOpen, setEditorOpen] = useState(false);
  // Variable that stores the entry that is going to be edited
  const [editorObject, setEditorObject] = useState({});
  // Variable that stores the property of the "entry object" that should be edited
  const [editorValue, setEditorValue] = useState("");
  // Variable that stored the data to be passed into the object
  const [editorInput, setEditorInput] = useState("");
  // Delete on item is pressed
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  // Used to identify ID of item to be deleted
  const [deleteId, setDeleteId] = useState(0);
  const { state, remove, update } = useContext(ItemContext);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <FAB
            style={{ margin: 8 }}
            small
            icon="cog"
            onPress={() => {
              setMenuOpen(false);
              setFoodSearchOpen(false);
              setEditorOpen(false);
              setDeleteOpen(false);
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
        data={[...state].reverse()} // Displaying most recent records first
        keyExtractor={(e) => e.id.toString()}
        renderItem={({ item }) => {
          return (
            <RecordItem
              item={item}
              setEditorObject={setEditorObject}
              setEditorValue={setEditorValue}
              setEditorInput={setEditorInput}
              setEditorOpen={setEditorOpen}
              setDeleteOpen={setDeleteOpen}
              setDeleteId={setDeleteId}
            />
          );
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
        <Portal>
          <Modal
            visible={isFoodSearchOpen}
            onDismiss={() => setFoodSearchOpen(false)}
            contentContainerStyle={{
              backgroundColor: "white",
              padding: 20,
            }}
          >
            <FoodSearch />
          </Modal>
        </Portal>
        <Portal>
          <Dialog
            visible={isEditorOpen}
            onDismiss={() => {
              setEditorOpen(false);
            }}
          >
            <Dialog.Title>Edit</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Data"
                value={editorInput}
                onChangeText={(text) => setEditorInput(text)}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  setEditorOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setEditorOpen(false);
                  if (editorInput !== "") {
                    editorObject[editorValue] = editorInput;
                    update(editorObject);
                  }
                }}
              >
                Done
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        {/* Pop up for item deletion */}
        <Portal>
          <Dialog visible={isDeleteOpen} onDismiss={() => setDeleteOpen(false)}>
            <Dialog.Title>
              Are you sure you want to delete this item?
            </Dialog.Title>
            <Dialog.Actions>
              <FAB
                style={{
                  marginRight: 20,
                }}
                icon="close"
                onPress={() => {
                  setDeleteOpen(false);
                }}
              />
              <FAB
                style={{
                  backgroundColor: COLOR.BLOOD_SUGAR,
                }}
                icon="check"
                onPress={() => {
                  remove(deleteId);
                  setDeleteOpen(false);
                }}
              />
            </Dialog.Actions>
          </Dialog>
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
                label: "Add Issue/Challenge",
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
                onPress: () => setFoodSearchOpen(true),
              },
            ]}
            onStateChange={({ open }) => {
              setMenuOpen(open);
            }}
            onPress={() => {
              setFoodSearchOpen(false);
              setSettingsOpen(false);
              setEditorOpen(false);
              setDeleteOpen(false);
            }}
          />
        </Portal>
      </Provider>
    </>
  );
}
