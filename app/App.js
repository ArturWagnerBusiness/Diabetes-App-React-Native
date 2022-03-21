import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddBloodSugarLevel from "./screens/AddBloodSugarLevel";
import AddExercise from "./screens/AddExercise";
import AddIssue from "./screens/AddIssue";
import AddMeal from "./screens/AddMeal";
import AddMedication from "./screens/AddMedication";
import ViewRecords from "./screens/ViewRecords";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="View">
        <Stack.Screen
          name="View"
          component={ViewRecords}
          options={{ title: "My Record History" }}
        />
        <Stack.Screen
          name="Meal"
          component={AddMeal}
          options={{ title: "Add New Meal" }}
        />
        <Stack.Screen
          name="Medication"
          component={AddMedication}
          options={{ title: "Add New Medication" }}
        />
        <Stack.Screen
          name="Issue"
          component={AddIssue}
          options={{ title: "Add New Issue/Challenge" }}
        />
        <Stack.Screen
          name="BloodSugar"
          component={AddBloodSugarLevel}
          options={{ title: "Add New Blood Sugar Level" }}
        />
        <Stack.Screen
          name="Exercise"
          component={AddExercise}
          options={{ title: "Add New Exercise" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
