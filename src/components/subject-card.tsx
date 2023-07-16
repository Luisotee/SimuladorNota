import { Card } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { SubjectObjI } from "../interface";

export function SubjectCard({ subjectObj }: { subjectObj: SubjectObjI }) {
  const [grades, setGrades] = useState<number[]>([]);

  function handleGradeChange(index: number, value: string) {
    const updatedGrades = [...grades];
    updatedGrades[index] = parseFloat(value);
    setGrades(updatedGrades);
  }

  function renderSquareInputs() {
    const inputs = [];
    for (let i = 0; i < subjectObj.moduleQuantity.value; i++) {
      inputs.push(
        <SquareInput
          key={i}
          value={grades[i]?.toString()}
          onChange={(value) => handleGradeChange(i, value)}
        />
      );
    }
    return inputs;
  }

  return (
    <View style={{ width: "100%" }}>
      <Card>
        <Card.Title>{subjectObj.subjectName.value}</Card.Title>
        <View style={styles.container}>{renderSquareInputs()}</View>
      </Card>
    </View>
  );
}

interface SquareInputProps {
  value: string;
  onChange: (value: string) => void;
}

function SquareInput({ value, onChange }: SquareInputProps) {
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
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
