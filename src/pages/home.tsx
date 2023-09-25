import React, { useState } from "react";
import { View } from "react-native";
import { AddSubjectButton } from "../components/add-subject-button";
import { SubjectObjI } from "../interface";
import { SubjectCard } from "../components/subject-card";

export function Home() {
  const [subjectObjs, setSubjectObjs] = useState<SubjectObjI[]>([]);

  // Function to delete a subject card
  const deleteSubjectCard = (indexToDelete: number) => {
    const updatedSubjectObjs = [...subjectObjs];
    updatedSubjectObjs.splice(indexToDelete, 1);
    setSubjectObjs(updatedSubjectObjs);
  };

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
