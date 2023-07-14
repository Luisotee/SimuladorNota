import { View } from "react-native";
import { AddSubjectButton } from "../components/add-subject-button";

export function Home() {
  return (
    <View style={{ marginTop: 20, marginHorizontal: 20 }}>
      <AddSubjectButton />
    </View>
  );
}
