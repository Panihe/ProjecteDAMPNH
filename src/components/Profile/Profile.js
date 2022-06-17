import { View, Text,Image,StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { List,Icon, Title, Divider, Avatar, Button, TextInput} from 'react-native-paper';

export default function Perfil() {
  return (
    <View style={{flex:3,}}>
      <View style={{flex:1,alignItems:'center'}}>
          <Avatar.Image size={120} source={require('../../../assets/profile_pic.jpg')} style={styles.profilePic} />
        <Title>JHON DOE</Title>
      </View>
      <View style={{flex:3 }}>
        <OwnData />
      </View>
    </View>
  );
}

const OwnData = () => {
return(
    <View>
        <ScrollView>
        <Button>EDIT PROFILE</Button>
        <List.Section title="About"style={{width:350}}>  
            <List.Item title="NAME" description="JHON DOE" left={() => <List.Icon icon="account"/> } />
            <List.Item title="EMAIL" description="JhonDoe@gmail.com" left={() => <List.Icon icon="email"/> }/>
            <List.Item title="PHONE NUMBER" description="123456789" left={() => <List.Icon icon="phone"/> }/>
            </List.Section>

            <List.Section title="Data"style={{width:350}}>  
            <List.Item title="WEIGHT" description="70KG" left={() => <List.Icon icon="alpha-h-box"/> } />
            <List.Item title="HEIGHT" description="180CM" left={() => <List.Icon icon="ruler"/> }/>
            
            <List.Accordion title="MESURES" left={() => <List.Icon icon="ruler"/> }>
                <List.Item title="BICEPS" description="30CM" />
                <List.Item title="LEG" description="30CM"/>
                <List.Item title="SHOULDER" description="30CM"/>
                <List.Item title="WEIST" description="30CM"/>
                <List.Item title="CHEST"  description="30CM"/>
            </List.Accordion>
            </List.Section>
            
        </ScrollView>
    </View>
)
}

const styles = StyleSheet.create({
    profilePic:{
        marginTop:50,
    }
  });
    
