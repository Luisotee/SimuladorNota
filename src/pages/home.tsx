import { View } from "react-native";
import { AddSubjectButton } from "../components/add-subject-button";
import { useState } from "react";
import { SubjectObjI } from "../interface";
import { SubjectCard } from "../components/subject-card";

export function Home() {
  const [subjectObjs, setSubjectObjs] = useState<SubjectObjI[]>([]);

  return (
    <View style={{ marginTop: 20, marginHorizontal: 20 }}>
      <AddSubjectButton
        subjectObjs={subjectObjs}
        setSubjectObjs={setSubjectObjs}
      />
      {subjectObjs.map((subjectObj, index) => (
        <SubjectCard key={index} subjectObj={subjectObj} />
      ))}
    </View>
  );
}
