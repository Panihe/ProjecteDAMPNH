import axios from "axios";
import { View, Text, StyleSheet } from 'react-native'
import { React, useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, IconButton, TextInput, Title } from 'react-native-paper'
import SelectDropdown from 'react-native-select-dropdown'

export default function Preparador() {
    const route = useRoute();
    const IdUser = route.params.IdUser;
    const [sessionInput, setSessionInput] = useState();
    const [exerciseInput, setExreciseInput] = useState();
    const [seriesInput, setSeriesInput] = useState();
    const [repsInput, setRepsInput] = useState();
    const [exercises, setExercises] = useState([]);
    const [sessions, setSessions] = useState([]);
    // const [sessionId, setSessionId] = useState();
    // const [IdExercise, setIdExercise] = useState();
    var IdExercise = '';
    var sessionId = '';
    let newSession = 'Session ' + sessions.length;
    const getSessions = () => {
        let data = JSON.stringify({
            IdUser: IdUser
        })
        console.log(data);
        axios
            .post("https://determined-faraday.82-223-16-225.plesk.page/databases/trainer_get_sessions.php", data)
            .then(function (response) {
                let tepmSes = response.data;
                tepmSes.push("Crear nueva sesión");

                setSessions(tepmSes);
            })
            .catch(function (error) {
                console.log("Petición fallida");
            });
    }
    const getExercises = () => {

        axios
            .post("https://determined-faraday.82-223-16-225.plesk.page/databases/trainer_get_exercises.php")
            .then(function (response) {
                setExercises(response.data);
            })
            .catch(function (error) {
                console.log("Petición fallida");
            });
    }
    const getExerciseId = () => {
        let exData = JSON.stringify({
            exerciseInput: exerciseInput,
        })
        axios
            .post("https://determined-faraday.82-223-16-225.plesk.page/databases/trainer_get_exercise_id.php", exData)
            .then(function (response) {
                IdExercise = response.data.IdExercise;
                getSessionId(response.data.IdExercise);
            })
            .catch(function (error) {
                console.log("Petición fallida");
            });
    }
    const getSessionId = (IdExercise) => {
        let sessionData = JSON.stringify({
            sessionInput: sessionInput,
            IdUser: IdUser,
        })
        axios
            .post("https://determined-faraday.82-223-16-225.plesk.page/databases/trainer_get_session_info.php", sessionData)
            .then(function (response) {
                // setSessionId(response.data.IdSession);
                sessionId = response.data.IdSession;
                console.log(sessionId);
                sendData(IdExercise, response.data.IdSession)
            })
            .catch(function (error) {
                console.log("Petición fallida");
            });
    }
    useEffect(() => {
        getExercises();
        getSessions();
    }, [])
    const sendData = (IdExercise, sessionId) => {


        let data = JSON.stringify({
            sessionId: sessionId,

            sessionInput: sessionInput,

            newSession: newSession,

            IdUser: IdUser,

            exerciseInput: exerciseInput,

            repsInput: repsInput,

            seriesInput: seriesInput,

            IdExercise: IdExercise,

        })
        if (sessionInput === "Crear nueva sesión") {
            console.log("nueva sesióin creada");
            console.log(data);
            axios
                .post("https://determined-faraday.82-223-16-225.plesk.page/databases/trainer_create_session.php", data)
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log("Petición fallida");
                });
        }
        let insertData = JSON.stringify({
            IdExercise: IdExercise,

            sessionId: sessionId,

            seriesInput: seriesInput,

            repsInput: repsInput,

        })
        console.log(insertData);
        axios
            .post("https://determined-faraday.82-223-16-225.plesk.page/databases/trainer_insert_exercises.php", insertData)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log("Petición fallida");
            });


    }
    return (
        <View style={styles.container}>
            <Title style={styles.title}>NEW ROUTINE</Title>
            <View style={{ flex: 1, marginTop: 40 }}>

                <SelectDropdown
                    data={sessions}
                    defaultButtonText="Session"
                    buttonStyle={{ justifyContent: 'center', textAlign: 'center'}}
                    dropdownStyle={styles.modal}
                    onSelect={setSessionInput}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'flex-start', width: 300}}>
                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'stretch', width: 'auto', alignSelf: 'center'}}>
                    <SelectDropdown
                        style={styles.modal}
                        data={exercises}
                        onSelect={setExreciseInput}
                        defaultButtonText="Exercises"
                        buttonStyle={{ justifyContent: 'center', textAlign: 'center'}}
                        dropdownStyle={styles.modal}


                    />
                </View>
            </View>

            <View style={{ flex: 2, }}>

                <TextInput
                    style={styles.input}
                    keyboardType='number-pad'
                    placeholder="SERIES"
                    placeholderTextColor={'#008000'}
                    left={<TextInput.Icon name="repeat" />}
                    mode='outlined'
                    activeOutlineColor='#29bf12'
                    outlineColor='#008000'
                    onChangeText={setRepsInput}
                    value={repsInput}

                />

                <TextInput
                    style={styles.input}
                    keyboardType='number-pad'
                    placeholder="REPS"
                    placeholderTextColor={'#008000'}
                    left={<TextInput.Icon name="repeat" />}
                    mode='outlined'
                    activeOutlineColor='#29bf12'
                    outlineColor='#008000'
                    onChangeText={setSeriesInput}
                    value={seriesInput}

                />

            </View>

            <Button mode='contained' color='#29bf12' icon='plus-circle-outline' style={{ marginBottom: 20 }} onPress={() => getExerciseId()}>ADD</Button>

                    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: 'rgba(255,255,255,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },
    title: {
        color: '#004b23',
        marginTop: 30,
    },
    modal: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderColor: '#29bf12',
        borderWidth: 1,
    },
    input: {
        padding: 3,
        width: 200,
        margin: 10,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderColor: '#29bf12'

    },

});
