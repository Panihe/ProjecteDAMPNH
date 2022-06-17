import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput, Title } from 'react-native-paper';
import { showMessage, hideMessage } from "react-native-flash-message";


export default function ClientCode() {
  const [code, setCode] = useState();

  const getCode = (code) => {
    let data = JSON.stringify({
      code: code
    })

    axios
      .post("https://determined-faraday.82-223-16-225.plesk.page/databases/auth.php", data)
      .then((response) => {
        console.log(response.data.CoachCode);

        Validate(response.data.CoachCode);
      })
      .catch(function (error) {
        console.log("Petición fallida");
      });

  }

  const Validate = () => {
    let valid = true;

    if (key != authKey) {
      valid = false;
      Alert.alert("WRONG KEY", "THE AUTHENTICATION KEY IS INVALID");
    } else {
      valid = true;

      showMessage({
        message: "Training has been saved",
        type: "success",
      });

    }

  }

  return (
    <View style={{ flex: 2, flexDirection: 'column', marginTop: 350, }}>
      <View >
        <Title style={{ color: '#004b23' }}>LINK TO YOUR TRAINER</Title>
        <TextInput placeholder="CODE"
          value={code} onChangeText={setCode}
          style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
          activeUnderlineColor='#29bf12'
          underlineColor={'#008000'}
          left={<TextInput.Icon name='barcode' />}
        />
        <Button onPress={() => getCode(code)} color='#29bf12' style={{ margin: 20 }}>VALIDATE</Button>

      </View>
 


    </View>
  );
}
