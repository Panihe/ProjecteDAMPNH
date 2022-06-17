import { React, useState, useCallback, useEffect, useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Dimensions, StatusBar, KeyboardAvoidingView, Platform, ScrollView, TextInput } from "react-native";
import { Avatar, Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';

import { auth, database } from "../../Firebase/Firebase";
import { GiftedChat, Send, Bubble } from "react-native-gifted-chat";
import { collection, addDoc, orderBy, query, onSnapshot, QuerySnapshot, doc, setDoc, toDate, snapshot, where, fromDate, Timestamp } from 'firebase/firestore';

import Context from "../Context/Context";

export default function ChatScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const [image, setImage] = useState();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    /*  const [messagesSenderUser, setMessagesSenderUser] = useState([]);
     const [messagesTargetUser, setMessagesTargetUser] = useState([]); */
    const { type, setType } = useContext(Context);

    /* User origin  */
    const user = auth.currentUser;
    const senderEmail = user.email;
    const senderName = user.name;
    console.log(senderEmail);

    /* User target */
    const targetName = route.params.Name;
    const targetEmail = route.params.Email;
    const targetLastName = route.params.LastName;
    const targetPhone = route.params.Phone;
    console.log(targetEmail);

    const userType = route.params.userType;

    /* setDoc */
    let messDate = '';
    let idDocument = '';
    let now = '';
    // let MessageName = newDate() + Name;

    let idConversacion = ''; // ordernadar alfabeticamente;

    /*     const collectionRef = collection(database, 'chatsTest');
        const q = query(collectionRef, orderBy('createdAt', 'desc')); */

    useEffect(() => {
        const collectionChats = collection(database, 'chats');

        alphabeticalSorting();

        const queryIdConversacion = query(collectionChats, where('idConversacion', '==', idConversacion), orderBy('createdAt', 'desc'));

        const getMessages = onSnapshot(queryIdConversacion, querySnapshot => {
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt,
                    idConversacion: doc.data().idConversacion,
                    text: doc.data().user.userSender + ': \n ' + doc.data().text,
                    user: {
                        name: doc.data().user.userSender,
                        userType: doc.data().user.userType
                    }
                    /* user: {
                        userSender: doc.data().user.userSender,
                        userTarget: doc.data().user.userTarget
                    } */

                }))

            );
        });

        return () => getMessages();
    }, []);

    const newDate = () => {
        //messDate = new Date().toISOString().substr(0, 19).replace('T', ' ');
        messDate = new Date().toUTCString();
        //messDate = messDate + 2000;
    }

    const generateIdDocument = (createdAt, senderEmail, targetEmail) => {
        idDocument = createdAt + "_" + senderEmail + "_" + targetEmail;
    }

    const alphabeticalSorting = () => {
        idConversacion = senderEmail + '-' + targetEmail;
        let split = idConversacion.split('-');
        split.sort((a, b) => {
            return a.localeCompare(b);
        });
        let orderIdConversation = split.join('-');
        idConversacion = orderIdConversation;
    }

    const handleOnSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)

        );

        const { _id, createdAt, text, userSender, userTarget } = messages[0];


        // addDoc(collection(database, 'chats', 'mensaje'), {
        //     _id,         
        //     createdAt,
        //     text,
        //     user
        // });
        newDate();
        alphabeticalSorting();

        generateIdDocument(createdAt, senderEmail, targetEmail);
        //now = new Date();
        setDoc(doc(database, "chats", idDocument), {
            _id,
            createdAt: messDate,
            idConversacion: idConversacion,
            text,
            user: {
                userSender: user.email,
                userTarget: targetEmail,
                userType: userType
            },
            
        });

        console.log(createdAt);
     

    }, []);

    /*  console.log(userSenderFirebase);
     console.log(senderEmail); */


    const renderBubble = () => {
        return (
            <Bubble 
                position={user.userType != userType ? 'right' : 'left'}
            />
        )
    }

    return (
        <View style={styles.container}>
            <View style={{ padding: 7.5, paddingLeft: 10, width: 'auto', backgroundColor: '#E6E6E6', marginTop: 15, borderRadius: 12.5 }}>
                <View style={{ diplay: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#8E8E8E', borderRadius: 25 }}>
                        <Avatar
                            rounded
                            //title={route.params.iniciales}
                            source={{
                                uri: "",
                            }}
                        />
                    </View>


                    <View style={{ marginLeft: 12.5 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>{targetName} {targetLastName}</Text>
                        <Text style={{ fontSize: 12, fontWeight: '300' }}>{targetEmail} - {targetPhone}</Text>
                    </View>
                </View>
            </View>

            <GiftedChat
                messages={messages}
                placeholder="Enter message"
                alwaysShowSend={true}
                onSend={messages => handleOnSend(messages)}
                user={{
                    _id: userType, userSender: senderEmail, userTarget: targetEmail, userType: userType
                }}
                /* renderSend={props => {
                    return (
                        <Send {...props}>
                            <TouchableOpacity onPress={messages => handleOnSend(messages)} activeOpacity={0.5}>
                                <Icon type="material-community" name="send" color="2B68E6" size={30} />
                            </TouchableOpacity>
                        </Send>
                    )
                }} */
                renderBubble={props => {
                    return (
                        <Bubble
                            {...props}
                            position={user.userType != userType ? 'right' : 'left'}
                            textStyle={{
                                left: {
                                    color: '#FFF',
                                    backgroundColor: 'grey',
                                    padding: 2,
                                    borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15,
                                },
                                right: {
                                    color: '#FFF',
                                    backgroundColor: '#7DCF5C',
                                    padding: 2,
                                    borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15,
                                },
                            }}
                            wrapperStyle={{
                                left: {
                                    backgroundColor: '#grey',
                                    borderBottomRightRadius: 15,

                                },
                                right: {
                                    backgroundColor: '#7DCF5C',
                                    borderBottomLeftRadius: 15,
                                },
                            }}
                            containerToPreviousStyle={{
                                right: { borderTopRightRadius: 15 },
                                left: { borderTopLeftRadius: 15 },
                            }}
                            containerToNextStyle={{
                                right: { borderTopRightRadius: 15 },
                                left: { borderTopLeftRadius: 15 },
                            }}
                            containerStyle={{
                                right: { borderTopRightRadius: 15 },
                                left: { borderTopLeftRadius: 15, padding: 5 },
                            }}

                            timeTextStyle={{
                                left: {
                                    color: 'blue'
                                },
                                right: { color: '#212121' }
                            }}
                        />
                    );
                }}
            />
        </View>


    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
});