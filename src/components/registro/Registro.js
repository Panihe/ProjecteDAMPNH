import { React, useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TextInput, Button} from "react-native-paper";
import axios from 'axios';

export default function Registro() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [focus, setFocus] = useState("");

    const sendData = () => {
        console.log('hola');
        let register = JSON.stringify({
                
            name: name,
            
            lastName: lastName,
        
           email: email,
        
           phone: phone,

           password: password,
         })
    
         console.log(register);
    
        axios
          .post("http://localhost:8080/databases/register.php", register)
          .then(function (response) {
            console.log(response.data);
            
            showMessage({
                message: "You have been logged succesfully",
                description: "Thank you for use our app",
                type: "success",
            });

          })
          .catch(function (error) {
            console.log("Petición fallida");
          });
       }

    const validation = () => {
        let validation = 'true';

        if (!name || !lastName || !email || !phone || !password || !passwordRepeat) {
            validation = 'false';
            Alert.alert("Empty fields, please fill in all the fields.");
            Alert.alert(name +''+ lastName +'' + email +''+ phone +''+ password +''+ passwordRepeat);
        } else {
            if (!/^[a-zA-Zs]+$/i.test(name)) {
                validation = 'false';
                Alert.alert("Name is not a valid, please try it again. ")
                alert("Name is not a valid, please try it again. ");
            }

            if (!/^[a-zA-Z]+$/i.test(lastName)) {
                validation = 'false';
                Alert.alert("Last name is not a valid, please try it again. ")
            }

            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(email)) {
                validation = 'false';
                Alert.alert("Email is not a valid, please try it again. ")
            }

            if (!/([0-9]{9})/i.test(phone)) {
                validation = 'false';
                Alert.alert("Phone is not a valid, please try it again. ")
            }

            if (!/^[a-zA-Z0-9]{8,}/i.test(password)) {
                validation = 'false';
                Alert.alert("Password is not a valid, please try it again. ")
            }

            if (!/^[a-zA-Z0-9]{8,}/i.test(passwordRepeat)) {
                validation = 'false';
                Alert.alert("Password Repeat is not a valid, please try it again. ")
            }

            // if (password === passwordRepeat) {
            //     validation = 'false';
            //     Alert.alert("Password Repeat not matches password. ")
            // }

            if (validation == 'true') {
                sendData();
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                keyboardType="default"
                style={[styles.textInput, focus ? styles.textInputFocus : null]}
                placeholder="Enter your name"
                placeholderTextColor={'#212121'}
                value={name}
                onChangeText={name => setName(name)}
                onFocus={() => setFocus({ focus: true })}
                onBlur={() => setFocus({ focus: false })}
                theme={{ colors: { primary: '#212121' } }} />
            <TextInput
                keyboardType="default"
                style={[styles.textInput, focus ? styles.textInputFocus : null]}
                placeholder="Enter your last name"
                placeholderTextColor={'#212121'}
                value={lastName}
                onChangeText={setLastName}
                onFocus={() => setFocus({ focus: true })}
                onBlur={() => setFocus({ focus: false })}
                theme={{ colors: { primary: '#212121' } }} />

            <TextInput
                keyboardType="email-address"
                style={[styles.textInput, focus ? styles.textInputFocus : null]}
                placeholder="Enter your email"
                placeholderTextColor={'#212121'}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocus({ focus: true })}
                onBlur={() => setFocus({ focus: false })}
                theme={{ colors: { primary: '#212121' } }} />

            <TextInput
                keyboardType="phone-pad"
                style={[styles.textInput, focus ? styles.textInputFocus : null]}
                placeholder="Enter your phone"
                placeholderTextColor={'#212121'}
                value={phone}
                onChangeText={setPhone}
                onFocus={() => setFocus({ focus: true })}
                onBlur={() => setFocus({ focus: false })}
                theme={{ colors: { primary: '#212121' } }} />

            <TextInput
                style={[styles.textInput, focus ? styles.textInputFocus : null]}
                placeholder="Enter a password"
                placeholderTextColor={'#212121'}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocus({ focus: true })}
                onBlur={() => setFocus({ focus: false })}
                theme={{ colors: { primary: '#212121' } }} />

            <TextInput
                style={[styles.textInput, focus ? styles.textInputFocus : null]}
                placeholder="Repeat a password"
                placeholderTextColor={'#212121'}
                value={passwordRepeat}
                onChangeText={setPasswordRepeat}
                onFocus={() => setFocus({ focus: true })}
                onBlur={() => setFocus({ focus: false })}
                theme={{ colors: { primary: '#212121' } }} />

            <Button style={styles.button} mode="contained" onPress={validation}>
                Sign Up
            </Button>
        </View>
    );
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
    },
    title: {
        fontSize: 30,
        fontWeight: '500',
        marginBottom: 30
    },
    textInput: {
        width: 250,
        backgroundColor: "#ccc",
        overflow: 'hidden',
        marginBottom: 5,
        borderRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textInputFocus: {
        color: 'blue'
    },
    button: {
        backgroundColor: '#212121'
    },
    errorMessage: {
        padding: 5,
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
    }
});
