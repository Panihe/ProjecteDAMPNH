import { React, useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, FlatList, TextInput } from "react-native";
import { Avatar, Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import Context from "../Context/Context";
import { auth, database } from '../../Firebase/Firebase';
import { collection, query, getDocs, onSnapshot, where, docs, doc} from 'firebase/firestore';

export default function Contacts() {
    const { clientes, setClientes } = useContext(Context);
    //const [clientesFull, setClientesFull] = useState([]);  
    /*  const [clients, setClients] = useState([]);   */
    const route = useRoute();
    const navigation = useNavigation();
    // const [search, setSearch] = useState('');
    const targetEmail = route.params.Email;
    const userType = 1;

    const profilePhoto = [
        "https://firebasestorage.googleapis.com/v0/b/proyectodampnh.appspot.com/o/Profile_photos%2FJose.jpg?alt=media&token=6b40efa3-046d-4dd9-bb92-b125b6662358",
        "https://firebasestorage.googleapis.com/v0/b/proyectodampnh.appspot.com/o/Profile_photos%2FPepe.jpg?alt=media&token=81dcb043-7f60-44cc-ab0a-b7f90aaa01f4",
        "https://firebasestorage.googleapis.com/v0/b/proyectodampnh.appspot.com/o/Profile_photos%2FCarlos.jpg?alt=media&token=1e513699-03d6-48f5-8c33-dedfdac69ad5"
    ]

    const getProfilePhotos = () => {

        const dbCollection = 'profilePhotos';

        const collectionPhotos = collection(database, dbCollection);

        const q = query(collectionPhotos);

        let i = 0;

        const getPhotos = onSnapshot(q, querySnapshot => {
            /*     querySnapshot.docs.forEach(doc => {
                    clientes[i].Url = doc.data().url;
                    i ++;

                    clientesFull = clientes.map(v => ({...v, isActive: true}))
                }) */

          /*   querySnapshot.docs.forEach(doc => {
                clientes[i].Url = doc.data().Url;    
                i++;
            }); */
        });

        return () => getPhotos();

        console.log(clientes);
    }

    useEffect(() => {
        getProfilePhotos();
    }, [])

    return (
        <View style={styles.container}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 'auto', marginToop: 40, padding: 5 }}>
                <View style={{ alignSelf: 'center' /* backgroundColor: '#8E8E8E' */, borderTopLeftRadius: 25, borderBottomLeftRadius: 25, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MyClients', { clients: clientes })}>
                        <Icon type="material-community" name="chevron-left" color="#FFF" size={30} />
                    </TouchableOpacity>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelft: 'center', paddingLeft: 12.5, width: 281.5 }}>
                    <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: '700' }}>Contacts</Text>
                </View>
            </View>
            <SafeAreaView style={styles.containerSafeAreaView}>
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 'auto' }}>
                    <View style={{ display: 'flex', flexDirection: 'column', marginTop: 15 }}>
                        <FlatList
                            data={clientes}
                            keyExtractor={item => item.Name}
                            renderItem={({ item, index }) => (
                                <View>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: 'auto', marginBottom: 10 }}>
                                        {/* <Text style={{ fontSize: 22 }}> {item.nombre} </Text> */}
                                        <Avatar
                                            rounded
                                            /*  title={() => {
                                                 <Icon />
                                             }} */
                                            /*  icon={{ name: 'user', type: 'font-awesome', color: '#FFF' }}
                                             containerStyle={{ flex: 1, marginTop: 3, backgroundColor: '#29bf12' }} */
                                            source={{ uri: profilePhoto[index]}}
                                        />

                                        <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { Name: item.Name, Email: item.Email, LastName: item.LastName, Phone: item.Phone, userType: userType })}>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', justifyContent: 'center' }}>
                                                <View style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', width: 260, marginLeft: 12.5 }}>
                                                    <Text style={{ fontSize: 16, fontWeight: '500' }} >{item.Name} {item.LastName}</Text>
                                                </View>
                                                {/* This View'll be Activated if get messages to a trainer's client */}
                                                {/* <View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'flex-end', }}>
                                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 25, height: 25, backgroundColor: '#8E8E8E', borderRadius: 20 }}>
                                                        <Text style={{ color: '#FFF' }}>1</Text>
                                                    </View>
                                                </View> */}
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.95,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 15
    },
    containerSafeAreaView: {
        flex: 0.95,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 50
    },
});