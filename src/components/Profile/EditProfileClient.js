import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { List, Icon, Title, Divider, Avatar, Button, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

//SENTENCIA SQL -> INSERT INTO cliente (CorreoCliente,TelefonoCliente,Peso,Biceps,Pierna,Hombro,Cadera,Pecho)
// VALUES (email,phone,weight,biceps,legs,shoulder,weist,chest);

export default function EditProfileClient() {
  const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/1361/1361728.png');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [weight, setWeight] = useState('');
  const [biceps, setBiceps] = useState('');
  const [legs, setLegs] = useState('');
  const [shoulder, setShoulder] = useState('');
  const [weist, setWeist] = useState('');
  const [chest, setChest] = useState('');

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
      
      <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', margin: 40 }}>
        <TouchableOpacity onPress={ImportPic}>
          {image && <Avatar.Image source={{ uri: image }} size={100} style={{ backgroundColor: 'white' }} />}
        </TouchableOpacity>
        <Title>JHON DOE</Title>
      </View>
        <EditData
        email={email}
        phone={phone}
        weight={weight}
        biceps={biceps}
        legs={legs}
        shoulder={shoulder}
        weist={weist}
        chest={chest}
        setEmail={setEmail}
        setPhone={setPhone}
        setWeight={setWeight}
        setBiceps={setBiceps}
        setLegs={setLegs}
        setShoulder={setShoulder}
        setWeist={setWeist}
        setChest={setChest}
        />
        <Image source={{ uri: image }} />
      </ScrollView>
    </View>
  );
}

const EditData = () => (
  <View>

    <View>
      <List.Section title="Data" style={{ width: 350 }} titleStyle={styles.Titol}  >
        <TextInput placeholder="WEIGHT"  left={<TextInput.Icon name="alpha-h-box" />}  underlineColor={'#008000'} activeUnderlineColor='#29bf12' style={styles.input}/>
        <TextInput placeholder="BICEPS"  left={<TextInput.Icon name="alpha-b-box-outline" />}  underlineColor={'#008000'} activeUnderlineColor='#29bf12' style={styles.input}/>
        <TextInput placeholder="LEG" left={<TextInput.Icon name="alpha-l-box-outline" />}  underlineColor={'#008000'} activeUnderlineColor='#29bf12' style={styles.input}/>
        <TextInput placeholder="SHOULDER"  left={<TextInput.Icon name="alpha-s-box-outline" />}  underlineColor={'#008000'} activeUnderlineColor='#29bf12' style={styles.input}/>
        <TextInput placeholder="WEIST"  left={<TextInput.Icon name="alpha-w-box-outline" />}  underlineColor={'#008000'} activeUnderlineColor='#29bf12'style={styles.input} />
        <TextInput placeholder="CHEST"  left={<TextInput.Icon name="alpha-c-box-outline" />}  underlineColor={'#008000'} activeUnderlineColor='#29bf12'style={styles.input}/>

      </List.Section>
      <List.Section title="About" style={{ width: 350 }} titleStyle={styles.Titol} >

        <List.Accordion title="PERSONAL" left={() => <List.Icon icon="account-circle-outline" />} titleStyle={styles.Titol}>
          <TextInput placeholder="EMAIL"  left={<TextInput.Icon name="email-outline" />}  underlineColor={'#008000'} activeUnderlineColor='#29bf12' style={styles.input}/>
          <TextInput placeholder="PHONE NUMBER"  left={<TextInput.Icon name="phone-outline" />} underlineColor={'#008000'} activeUnderlineColor='#29bf12' style={styles.input}/>
        </List.Accordion>
      </List.Section>
      <Button color={'#29bf12'} style={{margin:5}}>SAVE</Button>
    </View>
  </View>
)



const styles = StyleSheet.create({
  profilePic: {
    marginTop: 50,
  },
  input:{
    backgroundColor:'rgba(255, 255, 255, 0)',
    margin:2
  },
  Titol:{
    color:'#004b23',
  }
});

//<Avatar.Image size={120} source={require('../../../assets/profile_pic.jpg')} style={styles.profilePic} />


//backgroundColor:'white' ---- colorBotons:'#29bf12' ---- titols:'#004b23' ----- textos:'#008000'
