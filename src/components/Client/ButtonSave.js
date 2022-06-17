import { React, useEffect, useState } from "react";
import { View, StyleSheet, Text, Button } from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useNavigation } from '@react-navigation/native';



export default function ButtonSave() {
    const navigation = useNavigation();
    const routeScreen = 'MyTrainings';
    const message = () => { 
            navigation.navigate(routeScreen);
            /* HERE WE GONE SHOW OUR FIRST MESSAGE */
            showMessage({
                message: "Training has been saved",
                type: "success",
            });
     }
    


    return (
            <View style={styles.buttonSaveBox}>
                <Button style={styles.buttonSave} onPress={message} title="Finish" color="#29bf12"/>
            </View>
    )
}

const styles = StyleSheet.create({
    buttonSaveBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginTop: 5,
        marginRight: 30,
        marginBottom: 25
    },
    buttonSave: {
        padding: 90,
    }
});