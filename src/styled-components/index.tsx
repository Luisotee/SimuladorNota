import { StyleSheet, TextInput } from "react-native";
import { SquareInputProps } from "../interface";

const styles = StyleSheet.create({
  inputContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    textAlign: "center",
    margin: 5,
  },
});

export function SquareInput({ value, onChange }: SquareInputProps) {
  return (
    <TextInput
      style={styles.inputContainer}
      placeholder="0.00"
      keyboardType="numeric"
      maxLength={4}
      value={value}
      onChangeText={onChange}
    />
  );
}
