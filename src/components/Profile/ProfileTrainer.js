import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { List, Icon, Title, Divider, Avatar, Button, TextInput } from 'react-native-paper';

export default function ProfileTrainer() {
  const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/1361/1361728.png');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [clients, setClients] = useState('');
  const [studies, setStudies] = useState('');

  const APIRequest = async () => {
    console.log('presionado');
    axios({
      url: `http://localhost:8080/phpmyadmin/client_profile_get.php`,
    })
      .then((response) => {
        console.log('hola');
        console.log(response.data);
        setName(response.data.NombreCliente)
        console.logr(response.data.NombreCliente)
        console.log(name)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View style={{ flex: 3, }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
      <Avatar.Image size={100}  style={styles.profilePic} source={{uri:image}} />
        <Title>JHON DOE</Title>
      </View>
      <View style={{ flex: 3 }}>
        <OwnData
          name={name}
          email={email}
          phone={phone}
          code={code}
          clients={clients}
          studies={studies}
        />
      </View>
    </View>
  );
}

const OwnData = () => {
  return (
    <View>
      <ScrollView>
        <Button color='#29bf12'>EDIT PROFILE</Button>
        <List.Section title="About" style={{ width: 350 }} titleStyle={styles.listTit}>

          <List.Item title="NAME" description="JHON DOE" left={() => <List.Icon icon="account-outline" />} descriptionStyle={styles.listDesc} titleStyle={styles.listTit}/>
          <List.Item title="EMAIL" description="JhonDoe@gmail.com" left={() => <List.Icon icon="email-outline" />} descriptionStyle={styles.listDesc} titleStyle={styles.listTit}/>
          <List.Item title="PHONE NUMBER" description="123456789" left={() => <List.Icon icon="phone-outline" />} descriptionStyle={styles.listDesc} titleStyle={styles.listTit}/>
          <List.Item title="CODE" description="#1234" left={() => <List.Icon icon="barcode" />} descriptionStyle={styles.listDesc} titleStyle={styles.listTit} />
          <List.Item title="CLIENTS" description="4" left={() => <List.Icon icon="account-supervisor-circle" />} descriptionStyle={styles.listDesc} titleStyle={styles.listTit}/>
          <List.Item title="STUDIES CONDUCTED" description="Nutrition career - Sports Managment Licence" left={() => <List.Icon icon="book-multiple-outline" />} descriptionStyle={styles.listDesc} titleStyle={styles.listTit}/>
        </List.Section>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  profilePic: {
    marginTop: 50,
    backgroundColor:'white',
  },listDesc:{
    color:'#008000',
  },
  listTit:{
    color:'#004b23',
  }
});

