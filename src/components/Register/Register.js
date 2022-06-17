import { React, useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Alert, ImageBackground, Image } from 'react-native';
import { TextInput, Button, RadioButton } from "react-native-paper";
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from "@react-navigation/native";

/* Firebase */
import { auth } from "../../Firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import Context from "../Context/Context";

export default function Register() {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [focus, setFocus] = useState("");
    const {type, setType} = useContext(Context);
    const [checkEmail, setCheckEmail] = useState('');

    const route = useRoute();

    const sendData = () => {
        console.log('hola');
        let register = JSON.stringify({

            name: name,

            lastName: lastName,

            email: email,

            phone: phone,

            password: password,

            type: type,
        })

        console.log(register);

        axios
            .post("https://determined-faraday.82-223-16-225.plesk.page/databases/register.php", register)
            .then(function (response) {
                console.log(response.data);

                showMessage({
                    message: "You have been logged succesfully",
                    description: "Please Log in for verify your data",
                    type: "success",
                });

                navigation.navigate('Login');

            })
            .catch(function (error) {
                console.log("Petición fallida");
            });
    }

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            validation();
            //navigation.navigate('MyClients');
            //console.log('Hi' + user.email + ', has been login');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " " + errorMessage);
        });
    }

    const validation = () => {
        let validation = 'true';

        if (!name || !lastName || !email || !phone || !password || !passwordRepeat) {
            validation = 'false';
            Alert.alert("Empty fields, please fill in all the fields.");
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

            APIRequest(email);

            if(checkEmail == '') {
                if (validation == 'true') {
                    sendData();
                }
            }

        }
    }

    const APIRequest = (Email) => {
        let data = JSON.stringify({
            Email: Email
        })
        axios
            .post("https://determined-faraday.82-223-16-225.plesk.page/databases/auth.php", data)
            .then((response) => {
                //userInfo = response.data;
                //Validator(response.data.Password, response.data.Type, response.data.CoachCode, response.data.IdUser);
                setCheckEmail(response.data.Email);
            })
            .catch(function (error) {
                console.log("Petición fallida");
            });

    }


    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: 'https://www.novonordisk.co.in/patient-education/diabetes/4-pillars-of-diabetes-care/exercise-in-diabetes-management/_jcr_content/root/imagevideotext_copy.coreimg.png/1602061414284/website-exercise-2.png' }}
                style={{ flex: 1, justifyContent: 'flex-end', width: 'auto' }}
                resizeMode='cover'
            />
            <LinearGradient
                colors={['white', '#80b918']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ height: 600, justifyContent: 'space-around', paddingHorizontal: 70 }}
            >
                <View style={styles.text}>
                    <Image source={require('../../assets/AVIVA.png')} style={{ height: 100, width: 180 }} />
                </View>
                <TextInput
                    keyboardType="default"
                    style={[styles.textInput]}
                    placeholder="Enter your name"
                    placeholderTextColor={'#008000'}
                    activeUnderlineColor='#29bf12'
                    underlineColor={'#008000'}
                    value={name}
                    onChangeText={name => setName(name)}
                    onFocus={() => setFocus({ focus: true })}
                    onBlur={() => setFocus({ focus: false })}
                    theme={{ colors: { primary: '#212121' } }} />
                <TextInput
                    keyboardType="default"
                    style={[styles.textInput]}
                    placeholder="Enter your last name"
                    placeholderTextColor={'#008000'}
                    activeUnderlineColor='#29bf12'
                    underlineColor={'#008000'}
                    value={lastName}
                    onChangeText={setLastName}
                    onFocus={() => setFocus({ focus: true })}
                    onBlur={() => setFocus({ focus: false })}
                    theme={{ colors: { primary: '#212121' } }} />

                <TextInput
                    keyboardType="email-address"
                    style={[styles.textInput]}
                    placeholder="Enter your email"
                    placeholderTextColor={'#008000'}
                    activeUnderlineColor='#29bf12'
                    underlineColor={'#008000'}
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setFocus({ focus: true })}
                    onBlur={() => setFocus({ focus: false })}
                    theme={{ colors: { primary: '#212121' } }} />

                <TextInput
                    keyboardType="phone-pad"
                    style={[styles.textInput]}
                    placeholder="Enter your phone"
                    placeholderTextColor={'#008000'}
                    activeUnderlineColor='#29bf12'
                    underlineColor={'#008000'}
                    value={phone}
                    onChangeText={setPhone}
                    onFocus={() => setFocus({ focus: true })}
                    onBlur={() => setFocus({ focus: false })}
                    theme={{ colors: { primary: '#212121' } }} />

                <TextInput
                    style={[styles.textInput]}
                    placeholder="Enter a password"
                    placeholderTextColor={'#008000'}
                    activeUnderlineColor='#29bf12'
                    underlineColor={'#008000'}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setFocus({ focus: true })}
                    onBlur={() => setFocus({ focus: false })}
                    theme={{ colors: { primary: '#212121' } }}
                    secureTextEntry
                    />

                <TextInput
                    style={[styles.textInput]}
                    placeholder="Repeat a password"
                    placeholderTextColor={'#008000'}
                    activeUnderlineColor='#29bf12'
                    underlineColor={'#008000'}
                    value={passwordRepeat}
                    onChangeText={setPasswordRepeat}
                    onFocus={() => setFocus({ focus: true })}
                    onBlur={() => setFocus({ focus: false })}
                    theme={{ colors: { primary: '#212121' } }} 
                    secureTextEntry
                    />

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems:'center', marginTop: 10, marginBottom: 10}}>
                    <Text style={{color:'#008000'}}>USER</Text>
                    <RadioButton 
                        value={0}
                        status={type === 0 ? 'checked' : 'unchecked'}
                        onPress={() => setType(0)}
                        color={'white'}
                    />
                    <Text style={{color:'#008000'}}>TRAINER</Text>
                    <RadioButton 
                        value={1}
                        status={type === 1 ? 'checked' : 'unchecked'}
                        onPress={() => setType(1)}
                        color={'white'}
                    />
                    </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems:'center', marginBottom: 70  }}>
                    <Button mode='contained' color='#29bf12' icon='door-open' onPress={handleSignUp}>
                        SIGN UP
                    </Button>
                    <Button mode='text' color='white' onPress={() => navigation.navigate('Login')} icon='login'>
                        SIGN IN
                    </Button>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        /* justifyContent: 'space-evenly',
        alignItems: 'center', */
        alignItems: 'stretch',
        justifyContent: 'center',
        height: '65%',
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    text: {
        marginBottom: 5,
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: '500',
        marginBottom: 30
    },
    textInput: {
        width: 250,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        overflow: 'hidden',
        marginBottom: 5,
        borderRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    errorMessage: {
        padding: 5,
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
    }
});
