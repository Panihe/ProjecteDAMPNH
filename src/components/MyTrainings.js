import axios from "axios";
import { React, useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { Checkbox, List } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

export default function MyTrainings() {
    const navigation = useNavigation();
    const route = useRoute();
    console.log(route.params.id)
    let IdUser = route.params.id;
    let coachCode = route.params.coachCode;

    // const exercises = [
    //     { name: 'Squat' },
    //     { name: 'Romanian deadweight' },
    //     { name: 'Quadriceps extension' },
    //     { name: 'Seated hamstring curl' },
    //     { name: 'Interactive core routine' }
    // ]

    const [checked, setChecked] = useState(false);
    const [expanded, setExpanded] = useState(true);
    const [session, setSession] = useState([]);

    const handlePress = () => setExpanded(!expanded);

    // const [trainerData, setTrainerData] = useState([]);
    const userType = 0;
    const [coachName, setCoachName] = useState('');
    const [coachLastName, setCoachLastName] = useState('');
    const [coachEmail, setCoachEmail] = useState('');
    const [coachPhone, setCoachPhone] = useState('');

    useEffect(() => {
        //getExercises();
        getSessions();
        getCoachData(coachCode);
    }, [])

    const getSessions = () => {
        let sessionsData = JSON.stringify({

            IdUser: IdUser,

        })
        console.log(sessionsData);
        axios
            .post("https://determined-faraday.82-223-16-225.plesk.page/databases/client_get_sessions.php", sessionsData)
            .then(function (response) {
                console.log(response.data);
                setSession(response.data);
            })
            .catch(function (error) {
                console.log("Petición fallida");
            });

    }

    const getCoachData = (coachCode) => {
        let data = JSON.stringify({
            coachCode: coachCode
        })
        axios
            .post("https://determined-faraday.82-223-16-225.plesk.page/databases/coachEmail_get.php", data)
            .then((response) => {
                //userInfo = response.data;
                /*            setTrainerData(response.data);
                           console.log(response.data); */
                setCoachName(response.data.Name);
                setCoachEmail(response.data.Email);
                setCoachLastName(response.data.LastName);
                setCoachPhone(response.data.Phone);
            })
            .catch(function (error) {
                console.log("Petición fallida");
            });

    }

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingTop: 30 }}>
                    <View style={styles.sectionTitleBox}>
                        <View style={styles.titleBox}>
                            <Text style={styles.title}>MY TRAININGS</Text>
                        </View>
                    </View>
                    <View style={styles.chatBox}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ChatScreen", { Name: coachName, Email: coachEmail, LastName: coachLastName, Phone: coachPhone, userType: userType })}
                            style={styles.buttonContacts}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center' }}>
                                <Icon type='material-community' name='chat' color='#FFF' size={20} />
                                {/* <Text style={styles.textButtonContacts}>Contacts</Text> */}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {session.map((element, pos) => {
                let title = element.Name;
                return (<List.Accordion style={styles.listAccodion} title={title} key={pos} description={element.Descrip}>
                    <View style={styles.contentAccordionBox}>
                        <View style={styles.excerciseBox}>
                            {/* {exercises.map((element, pos) => {
                                return (<Text style={styles.excercise} key={pos}>{element.name}</Text>)
                            })} */}
                            <View style={styles.buttonStartBox}>
                                <Button style={styles.buttonStart} onPress={() => navigation.navigate('Exercise', { IdSession: element.IdSession, IdUser: element.IdUser })} title="Start" color="#29bf12" />
                            </View>
                        </View>
                    </View>
                </List.Accordion>)
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingTop: 20,
        backgroundColor: 'rgba(255,255,255,0.5)',
        margin: 5,
        borderRadius: 16,
    },
    sectionTitleBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginLeft: 100,
        marginRight: 100,
    },
    titleBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        // paddingTop: 30,
    },
    /*   titleBox: {
     
          justifyContent: 'flex-start',
          marginTop: 52.5,
          marginLeft: 17.5
      }, */
    title: {
        color: '#F49323',
        fontSize: 20,
        fontWeight: 'bold',
    },
    excerciseBox: {
        padding: 20,
        justifyContent: 'flex-start',
    },
    excercise: {
        lineHeight: 30
    },
    buttonStartBox: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 40,
    },
    listAccodion: {
        backgroundColor: '#ccc',
        marginTop: 25
    },
    chatBox: {
        padding: 1.25,
        height: 22.5,
        backgroundColor: '#29bf12',
        color: '#008000',
        borderRadius: 5,
    }
});