import { Button, Input, Overlay, Text } from "@rneui/themed";
import React, { useState } from "react";
import { View } from "react-native";
import InputSpinner from "react-native-input-spinner";

export function AddSubjectButton() {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Button size="lg" onPress={toggleOverlay}>
        Inserir Matéria
      </Button>
      <FormAddSubject visible={visible} toggleOverlay={toggleOverlay} />
    </View>
  );
}

function FormAddSubject({ visible, toggleOverlay }: any) {
  const [value, setValue] = useState(0); // State variable for value of InputSpinner

  const handleValueChange = (val: number) => {
    setValue(val); // Update the state value when InputSpinner value changes
  };

  return (
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay} fullScreen>
      <View style={{ padding: 20 }}>
        <Input placeholder="Nome da Matéria" />
        <InputSpinner
          max={10}
          min={0}
          step={1}
          rounded={false}
          showBorder
          value={value} // Value from state variable
          onChange={handleValueChange} // Callback function to update the state value
          style={{ marginBottom: 15 }} // Add margin bottom between InputSpinner and Button
          placeholder="Quantidade de módulos"
        />
        <Button size="lg">Pronto</Button>
      </View>
    </Overlay>
  );
}
