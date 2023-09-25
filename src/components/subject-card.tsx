import { Card, Icon, Text } from "@rneui/themed";
import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SubjectObjI } from "../interface";
import { SquareInput } from "../styled-components";
import {
  loadGradesFromStorage,
  saveGradesToStorage,
} from "../util/async-storage";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  equalSign: {
    fontSize: 22,
    alignSelf: "center",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export function SubjectCard({
  subjectObj,
  onDelete, // Add onDelete prop
}: {
  subjectObj: SubjectObjI;
  onDelete: () => void;
}) {
  const [grades, setGrades] = useState<string[]>([]);
  const [finalGrade, setFinalGrade] = useState("0.00");

  useEffect(() => {
    const loadGrades = async () => {
      const loadedGrades = await loadGradesFromStorage(
        subjectObj.subjectName.value
      );
      setGrades(loadedGrades);
    };

    loadGrades();
  }, [subjectObj.subjectName.value]);

  useEffect(() => {
    const sum = grades.reduce((acc, grade, index) => {
      const weight = parseFloat(subjectObj.moduleWeight.value[index]);
      const numericGrade = parseFloat(grade) || 0; // Parse as a number, default to 0
      return acc + numericGrade * weight;
    }, 0);
    const totalWeight = subjectObj.moduleWeight.value.reduce(
      (acc, weight) => acc + parseFloat(weight),
      0
    );
    const weightedAverage = totalWeight === 0 ? 0 : sum / totalWeight;
    setFinalGrade(weightedAverage.toFixed(2));

    saveGradesToStorage(subjectObj.subjectName.value, grades); // Save grades to AsyncStorage
  }, [grades, subjectObj.moduleWeight.value]);

  function handleGradeChange(index: number, value: string) {
    // Allow valid decimal numbers or empty string, default to "0.00"
    if (!isNaN(parseFloat(value)) || value === "") {
      const updatedGrades = [...grades];
      updatedGrades[index] = value;
      setGrades(updatedGrades);
    }
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
        <View style={styles.titleContainer}>
          <Card.Title>{subjectObj.subjectName.value}</Card.Title>
          <Icon name="delete" size={24} onPress={onDelete} />
        </View>
        <View style={styles.container}>
          {renderSquareInputs()}
          <Text style={styles.equalSign}> = </Text>
          <SquareInput value={finalGrade} />
        </View>
      </Card>
    </View>
  );
}
