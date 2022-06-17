import { React, useEffect, useState, useContext } from "react";
import axios from "axios";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Searchbar, Avatar, Card, Button, Title, Paragraph, BottomNavigation } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Context from "../Context/Context";

export default function Myclients() {
    const navigation = useNavigation();
    const route = useRoute();
    const { clientes, setClientes } = useContext(Context);

    /*   const {user, setUser} = useContext(Context);
  const {coachCode, setCoachCode} = useContext(Context);
  const {email, setEmail} = useContext(Context);
  /* const {idUser, setIdUser} = useContext(Context); */ /*
    const {lastName, setLastName} = useContext(Context);
    const {name, setName} = useContext(Context);
    const {password, setPassword} = useContext(Context);
    const {phone, setPhone} = useContext(Context);
    const {studies, setStudies} = useContext(Context);
    const {type, setType} = useContext(Context); */

    const [clients, setClients] = useState([]);
    const [nombre, setNombre] = useState([]);
    const CoachCode = route.params.CoachCode;
    console.log(CoachCode);
    const ClientEmail = route.params.Email;
    console.log(ClientEmail);

    const APIRequest = (CoachCode) => {
        let data = JSON.stringify({
            CoachCode: CoachCode,
        })

        axios
            .post("https://determined-faraday.82-223-16-225.plesk.page/databases/trainer_clients_get.php", data)
            .then((response) => {
                /*
                console.log(response.data);
                setUser(response.data.IdUser)
                setCoachCode(response.data.Email)
                setName(response.data.Name)
                setLastName(response.data.lastName)
                setPassword(response.data.Password)
                setPhone(response.data.Phone)
                setStudies(response.data.Studies)
                setType(response.data.Type)
                setClients(response.data);
                */
                setClientes(response.data);
                console.log(response.data.Email);

            })
            .catch(function (error) {
                console.log("Petición fallida");
            });

    }

    console.log(clientes);

    useEffect(() => {
        APIRequest(route.params.CoachCode, ClientEmail);

    }, [])

    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />


    // const clients = [
    //     { name: 'Victor Forés', email: 'viforo@floridauniversitaria.es' },
    //     { name: 'Ximo Balbastre', email: 'jobaba@floridauniversitaria.es' },
    //     { name: 'Aleix Soler', email: 'alsoma01@floridauniversitaria.es' },
    //     { name: 'Claudiu Nechitescu', email: 'clne@floridauniversitaria.es' },
    //     { name: 'Pau Nicolás', email: 'panihe@floridauniversitaria.es' },
    // ]

    return (
        <View style={styles.container}>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingTop: 30 }}>
                <View style={styles.sectionTitleBox}>
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>MY CLIENTS</Text>
                    </View>
                </View>

                <View style={styles.chatBox}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Contacts", { Email: ClientEmail })}
                        style={styles.buttonContacts}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center' }}>
                            <Icon type='material-community' name='chat' color='#FFF' size={20} />
                            {/* <Text style={styles.textButtonContacts}>Contacts</Text> */}
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.userDataBox}>
                <View style={styles.nameHeaderBox}>
                    <Text style={styles.nameHeader}>Name</Text>
                </View>
                <View style={styles.emailHeaderBox}>
                    <Text style={styles.emailHeader}>Email</Text>
                </View>
                <View style={styles.updateHeaderBox}>
                    <Text style={styles.updateHeader}>Update</Text>
                </View>
            </View>
            <View style={styles.lineBox}>
                <View style={styles.line}>

                </View>
            </View>

            {clientes.map((element, pos) => {
                return (
                    <View key={pos}>
                        <View style={styles.userDataBox}>
                            <View style={styles.nameBox}>
                                <Text style={styles.name}>{element.Name}</Text>
                            </View>
                            <View style={styles.emailBox}>
                                <Text style={styles.email}>{element.Email}</Text>
                            </View>
                            <View style={styles.updateBox}>
                                <Icon
                                    onPress={() => navigation.navigate('Preparador', { IdUser: element.IdUser })}
                                    type='material-community'
                                    name='pencil'
                                    color='#FFF'
                                    size={20} />
                            </View>
                        </View>
                        <View style={styles.lineBox}>
                            <View style={styles.lineLight}>

                            </View>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: '#004b23'
    },
    filterBox: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    SearchBarBox: {
        width: 300,
        height: 35,
        paddingLeft: 5,
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20
    },
    filterIconsBox: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    filterIcon: {
        backgroundColor: '#2096EE'
    },
    filterListIconBox: {
        marginLeft: 5,
        marginTop: 27.5,
        marginRight: 15
    },
    threeVerticalDotIconBox: {
        marginTop: 27.5
    },
    usersDataBox: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    userDataBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameHeaderBox: {
        marginTop: 40,
        marginLeft: 10,
        marginRight: 80,
    },
    nameHeader: {
        color: '#004b23',
    },
    emailHeaderBox: {
        marginTop: 40,
        marginRight: 180
    },
    emailHeader: {
        color: '#004b23',
    },
    updateHeaderBox: {
        marginTop: 40,
        marginRight: 20
    },
    updateHeader: {
        color: '#004b23',
    },
    lineBox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        height: 2.5,
        backgroundColor: '#E2E2E2',
        width: 400,
        flexDirection: 'row',
        top: 10,
        justifyContent: 'center',
    },
    lineLight: {
        height: 2.5,
        backgroundColor: '#E1E1E1',
        width: 385,
        flexDirection: 'row',
        top: 10,
        justifyContent: 'center',
    },
    nameBox: {
        width: 115,
        marginTop: 20,
        marginLeft: 5,
    },
    name: {
        color: '#008000',
    },
    emailBox: {
        width: 225,
        color: 'red',
        marginTop: 20,
    },
    email: {
        color: '#008000',
    },
    updateBox: {
        padding: 1.25,
        height: 22.5,
        backgroundColor: '#29bf12',
        color: '#008000',
        marginTop: 20,
        marginRight: 20,
        borderRadius: 5,
    },
    chatBox: {
        padding: 1.25,
        height: 22.5,
        backgroundColor: '#29bf12',
        color: '#008000',
        borderRadius: 5,
    }
});