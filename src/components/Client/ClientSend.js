import { React, useEffect, useState } from "react";
import { View, StyleSheet, Text, Button } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useNavigation } from '@react-navigation/native';



export default function ClientSend() {
    const navigation = useNavigation();
    const message = () => { 
            navigation.navigate('Registro');
            /* HERE WE GONE SHOW OUR FIRST MESSAGE */
            showMessage({
                message: "Simple message",
                type: "success",
            });
     }
    


    return (
        <View style={styles.container}>
            <Button onPress={message}  title="Request Details" color="#841584"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.5)',
        margin: 5,
        borderRadius: 16,
    }
});