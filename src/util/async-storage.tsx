import AsyncStorage from "@react-native-async-storage/async-storage";
import { SubjectObjI } from "../interface";

export async function storeSubject(subjectObjs: SubjectObjI[]) {
  try {
    await AsyncStorage.setItem("subjectObjs", JSON.stringify(subjectObjs));
  } catch (error) {
    console.error("Error saving data to AsyncStorage:", error);
  }
}

export async function loadSubject(): Promise<SubjectObjI[]> {
  try {
    const storedData = await AsyncStorage.getItem("subjectObjs");
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error("Error loading data from AsyncStorage:", error);
  }
  return []; // Return an empty array by default if no data is found
}

// Function to save grades to AsyncStorage
export async function saveGradesToStorage(
  subjectName: string,
  grades: string[]
) {
  try {
    await AsyncStorage.setItem(
      `subjectGrades_${subjectName}`,
      JSON.stringify(grades)
    );
  } catch (error) {
    console.error("Error saving grades to AsyncStorage:", error);
  }
}

// Function to load grades from AsyncStorage
export async function loadGradesFromStorage(
  subjectName: string
): Promise<string[]> {
  try {
    const storedGrades = await AsyncStorage.getItem(
      `subjectGrades_${subjectName}`
    );
    if (storedGrades) {
      return JSON.parse(storedGrades);
    }
  } catch (error) {
    console.error("Error loading grades from AsyncStorage:", error);
  }
  return [];
}
