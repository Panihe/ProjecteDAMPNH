import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { List, Icon, Title, Divider, Avatar, Button, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
//SENTENCIA SQL -> INSERT INTO entrenador (CorreoEntrenador,TelefonoEntrenador,Estudios) VALUES (email,phone,studies);
//EN PROCESO

export default function EditProfileTrainer() {
  const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/1361/1361728.png');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [studies, setStudies] = useState('');

  const ImportPic = async () => {
    let resultat = await ImagePicker.launchImageLibraryAsync(
      {
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      }
    );

    if (!resultat.cancelled) {
      setImage(resultat.uri);
    }
  };

  return (
    <View>
      <View style={{ flex: 1, alignItems: 'center'}}>
        <TouchableOpacity onPress={ImportPic}>
          {image && <Avatar.Image source={{ uri: image }} size={100} style={styles.profilePic} />}
        </TouchableOpacity>
        <Title>JHON DOE</Title>
      </View>

      <ScrollView>
        <EditData
          setEmail={setEmail}
          setPhone={setPhone}
          setStudies={setStudies}
          Email={email}
          Phone={phone}
          Studies={studies}
        />
      </ScrollView>
    </View>
  );
}



const EditData = (props) => (
  <View>
    <View>
      <List.Section title="About" style={{ width: 350 }} titleStyle={styles.listTit}>
        <TextInput placeholder="EMAIL" keyboardType='email-address' style={styles.input} value={props.email} onChangeText={props.setEmail}
         left={<TextInput.Icon name="email-outline" />} 
         underlineColor={'#008000'} activeUnderlineColor='#29bf12'
         />

        <TextInput placeholder="PHONE NUMBER" keyboardType='number-pad' style={styles.input} value={props.phone} onChangeText={props.setPhone}
         left={<TextInput.Icon name="phone-outline" />} 
         underlineColor={'#008000'} activeUnderlineColor='#29bf12'
         />

        <TextInput placeholder="STUDIES" style={styles.input} value={props.studies} onChangeText={props.setStudies}
         left={<TextInput.Icon name="book-outline" />}
         underlineColor={'#008000'} activeUnderlineColor='#29bf12'
         />

      </List.Section>
      <Button color={'#29bf12'} style={{margin:5}}>SAVE</Button>
    </View>
  </View>
)

const styles = StyleSheet.create({
  profilePic: {
    marginTop: 50,
    backgroundColor: 'white'
  },
  input:{
    backgroundColor:'rgba(255, 255, 255, 0)',
    margin:5
  },  listTit:{
    color:'#004b23',
  }
});

