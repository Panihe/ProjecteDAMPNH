import * as React from "react";
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
//import ModalDropdown from 'react-native-modal-dropdown'; //barra desplegable
import SelectDropdown from 'react-native-select-dropdown' // barra desplegable
import { Surface } from "react-native-paper";
import axios from "axios";

//llamadas axios a API
// const [client, setClient] = useState("");
// const [exercise, setExercise] = useState("");
// const [capital, setCapital] = useState("");
// const [weather, setWeather] = useState("");
// const countryValue = "Spain";


// useEffect(() => {
//         APIRequest();
//     }, [])



export default function ClientV2() {
    const exercicis = ["Legs", "Chest", "Arms", "Shoulders"];
    const [client, setClient] = useState("");
    const [exercise, setExercise] = useState("");
    const [series, setSeries] = useState("");
    
    
    const APIRequest = async () => {


        console.log('presionado');
        axios({
            url: `http://localhost:8080/databases/client_get.php`,
        })
            .then((response) => {
                console.log('hola');
                console.log(response.data);
                setClient(response.data.cliente);
                setExercise(response.data.nombre_ejercicio);
                setSeries(response.data.series);
                console.log(response.data.cliente);
                console.log(response.data.nombre_ejercicio);
            })
            .catch((error) => {
                console.log(error);
            });

        


    }

    useEffect(() => {
        APIRequest();
    }, [])

    return (
        <View style={{ flex: 2 }}>
            <View style={{ flex: 0.5, marginTop: 70 }}>
                <SelectDropdown data={exercicis}
                    onSelect={(selectedItem, index) => {
                        //console.log(selectedItem,index)
                    }}
                />
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Surface style={styles.superficie}>
                        <Text style={styles.textos}>{client}</Text>
                    </Surface>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Surface style={styles.superficie}>
                        <Text style={styles.textos}>{exercise}</Text>
                    </Surface>
                </View>

            </View>
            <View style={{ flex: 0.5 }}>
                <TouchableOpacity
                    onPress={APIRequest}
                    style={styles.boto}>

                    <Text>ENVIAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    textos: {
        fontSize: 20
    },
    boto: {
        backgroundColor: '#96FE5E',
        borderRadius: 5,
        alignItems: 'center',
        padding: 20
    },
    superficie: {
        width: 200,
        fontWeight: '600',
        backgroundColor: '#0086E9',
        height: 60,
        elevation: 12,
        alignItems: 'center'
    }
});