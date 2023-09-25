import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { AddSubjectButton } from "../components/add-subject-button";
import { SubjectObjI } from "../interface";
import { SubjectCard } from "../components/subject-card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadSubject, storeSubject } from "../util/async-storage";

export function Home() {
  const [subjectObjs, setSubjectObjs] = useState<SubjectObjI[]>([]);

  // Function to delete a subject card
  const deleteSubjectCard = (indexToDelete: number) => {
    const updatedSubjectObjs = [...subjectObjs];
    updatedSubjectObjs.splice(indexToDelete, 1);
    setSubjectObjs(updatedSubjectObjs);
  };

  // Load data from AsyncStorage when the app starts
  useEffect(() => {
    const loadData = async () => {
      const loadedData = await loadSubject(); // Use the loadSubject function
      setSubjectObjs(loadedData);
    };

    loadData();
  }, []);

  // Save data to AsyncStorage whenever subjectObjs changes
  useEffect(() => {
    storeSubject(subjectObjs);
  }, [subjectObjs]);

  return (
    <View style={{ marginTop: 20, marginHorizontal: 20 }}>
      <AddSubjectButton
        subjectObjs={subjectObjs}
        setSubjectObjs={setSubjectObjs}
      />
      {subjectObjs.map((subjectObj, index) => (
        <SubjectCard
          key={index}
          subjectObj={subjectObj}
          onDelete={() => deleteSubjectCard(index)} // Pass the delete function
        />
      ))}
    </View>
  );
}
