import { React,useEffect,useState } from "react";
import { View, Text,StyleSheet, TouchableOpacity } from "react-native";
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
const exercicis = ["Legs","Chest","Arms","Shoulders"];

const APIRequest = async () =>{

    const [client, setClient] = useState("");
    const [exercise, setExercise] = useState("");
    const [series, setSeries] = useState("");
    console.log('presionado');
        axios({
            url: `http://localhost:8080/databases/client_get.php`,
        })
            .then((response) => {
                console.log('hola');

                setClient(response.data.cliente);
                setExercise(response.data.nombre_ejercicio);
                setSeries(response.data.series);
                console.log(series);
                // console.log(exercise);

            })
            .catch((error) => {
                console.log(error);
            });
        
            console.log(response);


    
}

// useEffect(() => {
//         APIRequest();
//     }, [])


export default function Client() {
    return(
        <View style={{flex:2}}>
            <Desplegable />
            <View style={{flex:1}}>
               <Informacio text="series" />
               <Informacio text="Reps" />
            </View>
            <BotoEnviar />
        </View>
    );
}

const Desplegable = () =>{
    return(
    <View style={{flex:0.5,marginTop:70}}>       
        <SelectDropdown data={exercicis} 
        onSelect={(selectedItem, index) => { 
        //console.log(selectedItem,index)
        }}
        />
    </View>
    )  
}


const Informacio = (props) =>{
    return(
    <View style={{flex:1, alignItems:'center'}}>
        <Surface style={styles.superficie}>
            <Text style={styles.textos}>{props.text}</Text>
        </Surface>
    </View>
    )
    

}

const BotoEnviar = () =>{
    return(
        <View style={{flex:0.5}}>
                <TouchableOpacity 
                onPress={APIRequest}
                style={styles.boto}>
                    <Text>ENVIAR</Text>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    textos: {
        fontSize:20
    },
    boto:{
        backgroundColor:'#96FE5E',
        borderRadius:5,
        alignItems:'center',
        padding:20  
    },
    superficie:{
        width:200,
        fontWeight:'600',
        backgroundColor:'#0086E9',
        height:60,
        elevation:12,
        alignItems:'center'
    }
  });