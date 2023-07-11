import { Icon, Input } from "@rneui/base";
import { TouchableOpacity } from "react-native";

export function SquareInput() {
  return (
    <Input
      containerStyle={{
        width: 60, // Adjust the width as per your requirement
        height: 60, // Adjust the height as per your requirement
        justifyContent: "center",
      }}
      inputContainerStyle={{
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 5,
        justifyContent: "center",
      }}
      inputStyle={{
        textAlign: "center", // Add this line to center the inputted number
      }}
    />
  );
}

export function SquareActionButton({ onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 50, // Adjust the width as per your requirement
        height: 50, // Adjust the height as per your requirement
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
      }}
    >
      <Icon
        name="plus"
        type="font-awesome"
        color="gray"
        size={24} // Adjust the size of the plus icon as per your requirement
      />
    </TouchableOpacity>
  );
}
