import { Button, Icon, Input, Overlay, Text } from "@rneui/themed";
import React, { useState } from "react";
import { View } from "react-native";
import InputSpinner from "react-native-input-spinner";
import { SubjectObjI } from "../interface";

export function AddSubjectButton({
  subjectObjs,
  setSubjectObjs,
}: {
  subjectObjs: SubjectObjI[];
  setSubjectObjs: React.Dispatch<React.SetStateAction<SubjectObjI[]>>;
}) {
  const [visible, setVisible] = useState<boolean>(false);

  function toggleOverlay(): void {
    setVisible(!visible);
  }

  return (
    <View>
      <Button size="lg" onPress={toggleOverlay}>
        Inserir Matéria
      </Button>
      <FormAddSubject
        visible={visible}
        toggleOverlay={toggleOverlay}
        subjectObjs={subjectObjs}
        setSubjectObjs={setSubjectObjs}
      />
    </View>
  );
}

function FormAddSubject({
  visible,
  toggleOverlay,
  subjectObjs,
  setSubjectObjs,
}: {
  visible: boolean;
  toggleOverlay: () => void;
  subjectObjs: SubjectObjI[];
  setSubjectObjs: React.Dispatch<React.SetStateAction<SubjectObjI[]>>;
}) {
  const [moduleQuantity, setModuleQuantity] = useState<number>(0);
  const [moduleWeight, setModuleWeight] = useState<string[]>([]);
  const [subjectName, setSubjectName] = useState<string>("");

  function handleModuleQuantity(val: number): void {
    setModuleQuantity(val);
  }

  function handleModuleWeightChange(index: number, inputValue: string): void {
    const updatedWeights: string[] = [...moduleWeight];
    updatedWeights[index] = inputValue;
    setModuleWeight(updatedWeights);
  }

  function handleSubjectNameChange(text: string): void {
    setSubjectName(text);
  }

  function renderModuleWeightInputs(): JSX.Element[] {
    const inputs: JSX.Element[] = [];
    for (let i = 0; i < moduleQuantity; i++) {
      inputs.push(
        <Input
          key={i}
          placeholder={`Peso em % do módulo ${i + 1}`}
          value={moduleWeight[i] || ""}
          keyboardType="numeric"
          onChangeText={(text) => handleModuleWeightChange(i, text)}
        />
      );
    }
    return inputs;
  }

  function handleSubjectCreation(): void {
    // Calculate the sum of module weights
    const sumOfWeights = moduleWeight.reduce(
      (acc, weight) => acc + parseFloat(weight),
      0
    );

    // Check if the sum of weights is equal to 100
    if (sumOfWeights === 100) {
      const newSubjectObj: SubjectObjI = {
        moduleQuantity: {
          value: moduleQuantity,
          setValue: setModuleQuantity,
        },
        moduleWeight: {
          value: moduleWeight,
          setValue: setModuleWeight,
        },
        subjectName: {
          value: subjectName,
          setValue: setSubjectName,
        },
      };

      setSubjectObjs((prevSubjectObjs) => [...prevSubjectObjs, newSubjectObj]);
      toggleOverlay();
    } else {
      // Display an error message
      alert("A soma dos modulos tem que ser igual a 100");
    }
  }

  return (
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <View style={{ padding: 20 }}>
        <Input
          placeholder="Nome da Matéria"
          value={subjectName}
          onChangeText={handleSubjectNameChange}
        />
        <InputSpinner
          max={10}
          min={0}
          step={1}
          rounded={false}
          showBorder
          value={moduleQuantity}
          onChange={handleModuleQuantity}
          style={{ marginBottom: 15 }}
          placeholder="Quantidade de módulos"
        />
        {renderModuleWeightInputs()}
        <Button size="lg" onPress={handleSubjectCreation}>
          Pronto
        </Button>
      </View>
    </Overlay>
  );
}
