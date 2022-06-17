import { React, useEffect, useState } from "react";
import axios from "axios";
import { View, StyleSheet, Alert, ImageBackground, Image } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { TextInput, Button } from "react-native-paper";

/* Firebase */
import { auth } from "../../Firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
    const navigation = useNavigation();
    const [Email, setEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");


    const Validator = (constraseña, userType, CoachCode, id) => {
        let valid = 'true';
        // APIRequest(Email);
        // delay(5000);
        //setTimeout(5000);

        if (!Email || !userPassword) {
            valid = 'false';
            Alert.alert(
                "Empty fields",
                "Please fill in all the fields.",
                [{ text: "OK" }]
            );
        } else {
            if (userPassword != constraseña) {
                valid = 'false';
                Alert.alert(
                    "Autentication error",
                    "Email or Password not valid",
                    [{ text: "OK" }]
                );
            }
            if (valid == 'true') {
                showMessage({
                    message: "You have been logged succesfully",
                    description: "Thank you for use our app",
                    type: "success",
                });
                console.log(userType);
                if (userType === '0') {
                    console.log(CoachCode);
                    if (CoachCode != null) {
                        console.log("he entrado");
                        navigation.navigate('MyTrainings', { id: id, coachCode: CoachCode });
                    } else {
                        console.log("no he entrado");
                        navigation.navigate('ClientCode', { id: id });
                    }
                } else {
                    console.log(userType);
                    navigation.navigate('MyClients', { CoachCode: CoachCode });
                }
                //navigation.navigate(routeScreen); 

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
                Validator(response.data.Password, response.data.Type, response.data.CoachCode, response.data.IdUser);
            })
            .catch(function (error) {
                console.log("Petición fallida");
            });

    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, Email, userPassword)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                APIRequest(Email);
                //navigation.navigate('MyClients');
                //console.log('Hi'+ user + ', has been login');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + " " + errorMessage);
            });
    }

    return (
        <View style={styles.greenStyle}>
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
                    <Image source={require('../../assets/AVIVA.png')} style={{ height: 140, width: 210 }} />
                </View>
                <TextInput
                    left={<TextInput.Icon name="email-outline" />}
                    style={styles.input}
                    activeUnderlineColor='#29bf12'
                    underlineColor={'#008000'}
                    placeholder="Email"
                    placeholderTextColor={'#008000'}
                    value={Email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                />
                <TextInput
                    left={<TextInput.Icon name="lock-outline" />}
                    style={styles.input}
                    activeUnderlineColor='#29bf12'
                    underlineColor={'#008000'}
                    secureTextEntry
                    value={userPassword}
                    onChangeText={setUserPassword}
                    placeholder="Password"
                    placeholderTextColor={'#008000'}
                />

                <View style={{ margin: 20, flexDirection: 'row' }}>
                    <Button mode='contained' color='#29bf12' onPress={() => handleLogin()} icon='login'>
                        SIGN IN
                    </Button>
                    <Button mode='text' color='white' onPress={() => navigation.navigate('Register')} icon='door-open'>
                        SIGN UP
                    </Button>
                </View>
            </LinearGradient>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        // height: 128,
        width: 300,
        margin: 5,
        borderRadius: 16,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 6,
        // },
        // shadowOpacity: 0.37,
        // shadowRadius: 7.49,
        // elevation: 12,
    },

    text: {
        marginBottom: 10,
        alignItems: 'center'
    },
    input: {
        /*
        borderBottomWidth: 1,
        width: 200,
        margin: 10,
        textAlign: "center",
        color: 'white',
        borderRadius: 0,
        padding: 10,
        // clearTextOnFocus: 'true',
        */
        padding: 3,
        width: 200,
        margin: 10,
        backgroundColor: 'rgba(255, 255, 255, 0)',

    },
    flash: {
        paddingTop: 70,
    },
    button: {
        marginTop: 20,
        padding: 10,
        width: 200,

        borderRadius: 10,
        backgroundColor: "#930100",
    },
    textButton: {
        color: 'white',
        textAlign: "center",
    },
    greenStyle: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        height: '65%',

    },
    orangeStyle: {
        backgroundColor: '#393e46',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 400,
    },

});

//backgroundColor:'white' ---- colorBotons:'#29bf12' ---- titols:'#004b23' ----- textos:'#008000'