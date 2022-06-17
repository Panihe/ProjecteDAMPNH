import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput,Title } from 'react-native-paper';
import { showMessage, hideMessage } from "react-native-flash-message";


export default function ClientCode() {
  const [authKey,setKey] = useState();

  const key = "KEY"

  const createCode = (trainerName,clientName,id) => {
    let code1 = "";
    let code2 = "";
    let code = "";
    code1 += trainerName.split("",3);
    code1 = code1.split(",");
    code2 += clientName.split("",3);
    code2 = code2.split(",");
    for (let index = 0; index < code1.length; index++) {
      code += code1[index];
    }
    for (let index = 0; index < code2.length; index++) {
      code += code2[index];
    }

    code += id.toString();  
    //return code  
    console.log(code);
  }

const Validate = () => {
let valid = true;

  if(key != authKey ){
    valid = false;
    Alert.alert("WRONG KEY","THE AUTHENTICATION KEY IS INVALID");
  }else{
    valid=true;

    showMessage({
      message: "Training has been saved",
      type: "success",
  });
   
  }
  
}

  return (
    <View style={{flex:2,flexDirection:'column',marginTop:350,}}>
      <View >
      <Title style={{color:'#004b23'}}>LINK TO YOUR TRAINER</Title>
      <TextInput placeholder="CODE" 
      value={authKey} onChangeText={setKey} 
      style={{backgroundColor:'rgba(255, 255, 255, 0)'}}
      activeUnderlineColor='#29bf12'
      underlineColor={'#008000'}
      left={<TextInput.Icon name='barcode'/>}
      />  
      <Button onPress={() => createCode('alex','pau',23)} color='#29bf12' style={{margin:20}}>VALIDATE</Button>
      
      </View>
      
      

    </View>
  );
}
