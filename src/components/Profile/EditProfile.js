import { View, Text,StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { List,Icon, Title, Divider, Avatar, Button, TextInput} from 'react-native-paper';

export default function EditProfile() {
  return (
      <View>
      <View style={{flex:1,alignItems:'center'}}>
          <TouchableOpacity>
          <Avatar.Image size={120} source={require('../../assets/profile_pic.jpg')} style={styles.profilePic} />
            </TouchableOpacity>
        <Title>JHON DOE</Title>
      </View>
        <View>
            <List.Section title="About"style={{width:350}}>  
                <TextInput placeholder="EMAIL"/>
                <TextInput placeholder="PHONE NUMBER"/>
            </List.Section>
            <List.Section title="Data"style={{width:350}}>  
            <TextInput placeholder="WEIGHT"/>
            <List.Accordion title="MESURES" left={() => <List.Icon icon="ruler"/> }>
                <TextInput placeholder="BICEPS"/>
                <TextInput placeholder="LEG"/>
                <TextInput placeholder="SHOULDER"/>
                <TextInput placeholder="WEIST"/>
                <TextInput placeholder="CHEST"/>
                </List.Accordion>
            </List.Section>
                <Button>SAVE</Button>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    profilePic:{
        marginTop:50,
    }
  });
    
