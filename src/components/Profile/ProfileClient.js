import { View, Text,Image,StyleSheet, ScrollView } from 'react-native';
import React,{useEffect,useState} from 'react';
import { List,Icon, Title, Divider, Avatar, Button, TextInput} from 'react-native-paper';
import axios from 'axios';

export default function ProfileClient() {

  const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/1361/1361728.png');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [weight,setWeight] = useState('');
  const [height,setHeight] = useState('');
  const [biceps,setBiceps] = useState('');
  const [leg,setLeg] = useState('');
  const [shoulder,setShoulder] = useState('');
  const [weist,setWeist] = useState('');
  const [chest,setChest] = useState('');

  return (
    <View style={{flex:3,}}>
      <View style={{flex:1,alignItems:'center'}}>
          <Avatar.Image size={100}  style={styles.profilePic} source={{uri:image}} />
        <Title>JHON DOE</Title>
      </View>
      <View style={{flex:3 }}>
        <OwnData 
        name={name}
        email={email}
        phone={phone}
        weight={weight}
        height={height}
        biceps={biceps}
        leg={leg}
        shoulder={shoulder}
        weist={weist}
        chest={chest}
        />
      </View>
    </View>
  );
}

const OwnData = () => {
return(
    <View>
        <ScrollView>
        <Button color='#29bf12'>EDIT PROFILE</Button>
        <List.Section title="Data"style={{width:350}} titleStyle={styles.listTit} > 

                <List.Item title="WEIGHT" description="70KG" left={() => <List.Icon icon="alpha-h-box"/> } descriptionStyle={styles.listDesc} titleStyle={styles.listTit}/>
                <List.Item title="HEIGHT" description="180CM" left={() => <List.Icon icon="ruler"/> } descriptionStyle={styles.listDesc} titleStyle={styles.listTit}/>
                <List.Item title="BICEPS" description="30CM" left={() => <List.Icon icon="alpha-b-box-outline"/> } descriptionStyle={styles.listDesc} titleStyle={styles.listTit}/>
                <List.Item title="LEG" description="30CM" left={() => <List.Icon icon="alpha-l-box-outline"/> } descriptionStyle={styles.listDesc} titleStyle={styles.listTit}/>
                <List.Item title="SHOULDER" description="30CM" left={() => <List.Icon icon="alpha-s-box-outline"/> } descriptionStyle={styles.listDesc} titleStyle={styles.listTit}/>
                <List.Item title="WEIST" description="30CM" left={() => <List.Icon icon="alpha-w-box-outline"/> } descriptionStyle={styles.listDesc} titleStyle={styles.listTit}/>
                <List.Item title="CHEST"  description="30CM" left={() => <List.Icon icon="alpha-c-box-outline"/> } descriptionStyle={styles.listDesc} titleStyle={styles.listTit}/>

            </List.Section>

            <List.Section title="About"style={{width:350}} titleStyle={styles.listTit} >  
            
            <List.Accordion title="PERSONAL" left={() => <List.Icon icon="account-circle-outline"/> } titleStyle={styles.listTit}>
            <List.Item title="NAME" description="JHON DOE" left={() => <List.Icon icon="account-outline"/> } descriptionStyle={styles.listDesc}/>
            <List.Item title="EMAIL" description="JhonDoe@gmail.com" left={() => <List.Icon icon="email-outline"/> } descriptionStyle={styles.listDesc}/>
            <List.Item title="PHONE NUMBER" description="123456789" left={() => <List.Icon icon="phone-outline"/> } descriptionStyle={styles.listDesc}/>
            </List.Accordion>
            </List.Section>
            
        </ScrollView>
    </View>
)
}


const styles = StyleSheet.create({
    profilePic:{
        marginTop:50,
        backgroundColor:'white',
    },
    listDesc:{
      color:'#008000',
    },
    listTit:{
      color:'#004b23',
    }
  });
    

  //backgroundColor:'white' ---- colorBotons:'#29bf12' ---- titols:'#004b23' ----- textos:'#008000'
