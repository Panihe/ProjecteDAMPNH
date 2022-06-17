import * as React from "react";
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
//import ModalDropdown from 'react-native-modal-dropdown'; //barra desplegable
import SelectDropdown from 'react-native-select-dropdown' // barra desplegable
import { Surface } from "react-native-paper";
import axios from "axios";

export default function ClientAPI() {
    const clients = ['1', '2', '3', '4', '5', '6'];
    const [client, setClient] = useState("");
    const [exercise, setExercise] = useState("");
    const [series, setSeries] = useState("");

    const APIRequest = (id) => {
        let data = JSON.stringify({
            sessionId: id
         })
    
         console.log(data);
    
        
        axios
        .post("http://localhost:8080/databases/client_getV2.php", data)
          .then((response) => {
            console.log('hola');
            console.log(response.data);
            setClient(response.data.cliente);
            setExercise(response.data.nombre_ejercicio);
            setSeries(response.data.series);
            console.log(response.data.cliente);
            console.log(response.data.nombre_ejercicio);
          })
          .catch(function (error) {
            console.log("Petición fallida");
          });
       }

    return (
        <View style={{ flex: 2 }}>
            <View style={{ flex: 0.5, marginTop: 70 }}>
                <SelectDropdown data={clients}
                    onSelect={(id, index) => {
                        APIRequest(id);
                    }}
                    // onChange={APIRequest()}
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









// const APIRequest = async () => {

//     let data = JSON.stringify({
        
//         clientId: id,
    
//      })

//      console.log(data);

//     console.log('presionado');
//     axios({
//         url: `http://localhost:8080/databases/client_get.php`, data
//     })
//         .then((response) => {
//             console.log('hola');
//             console.log(response.data);
//             setClient(response.data.cliente);
//             setExercise(response.data.nombre_ejercicio);
//             setSeries(response.data.series);
//             console.log(response.data.cliente);
//             console.log(response.data.nombre_ejercicio);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }
