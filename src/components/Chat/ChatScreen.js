import { auth, database } from '../../Firebase/Firebase';
import { collection, addDoc, orderBy, query, onSnapshot, QuerySnapshot, doc, setDoc, toDate, snapshot, where, fromDate, Timestamp, getDocs } from 'firebase/firestore';
import React, { useCallback, useLayoutEffect, useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Dimensions, StatusBar, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ChatScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const [messages, setMessages] = useState([]);
    const [profilePhotos, setProfilePhotos] = useState('');

    const userType = route.params.userType;

    /* User Origin */
    const user = auth.currentUser;
    const senderEmail = user.email;

    /* User target */
    const targetName = route.params.Name;
    const targetEmail = route.params.Email;
    const targetLastName = route.params.LastName;
    const targetPhone = route.params.Phone;

    let userSender = '';
    let userTarget = '';

    /* setDoc */
    let messDate = '';
    let idDocument = '';
    let idConversacion = '';

    const newDate = () => {
        //messDate = new Date().toISOString().substr(0, 19).replace('T', ' ');  
        //messDate = messDate + 2000;
        messDate = new Date().toUTCString();
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

    useLayoutEffect(() => {
        const dbCollection = 'chats'; 

        const collectionChats = collection(database, dbCollection);

        alphabeticalSorting();

        const queryIdConversacion = query(collectionChats, where('idConversacion', '==', idConversacion), orderBy('createdAt', 'desc'));

        const getMessages = onSnapshot(queryIdConversacion, querySnapshot => {

            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt,
                    idConversacion: doc.data().idConversacion,
                    text: doc.data().text,
                    user: {
                        _id: doc.data().user._id,
                        // name: doc.data().user.userSender,
                        userSender: doc.data().user.userSender,
                        userTarget: doc.data().user.target,
                    }
                }))

            )
        })

        return () => getMessages();

    }, [])


    const getProfilePhotos = async() => {
        const dbCollection = 'profilePhotos';

        const collectionProfilePhotos = collection(database, dbCollection);

        const q = query(collectionProfilePhotos, where("email", "==", targetEmail));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setProfilePhotos(doc.data().url);
        });
    }

    useEffect(() => {
        getProfilePhotos()
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

        const { _id, createdAt, text, userSender, userTarget } = messages[0];

        generateIdDocument(createdAt, senderEmail, targetEmail);
        newDate();
        alphabeticalSorting()

        setDoc(doc(database, "chats", idDocument), {
            _id,
            createdAt: messDate,
            idConversacion: idConversacion,
            text,
            user: {
                _id: userType,
                userSender: user.email,
                userTarget: targetEmail,
            },
        })

    }, [])

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#212121',
                        marginLeft: 0
                    },
                    right: {
                        backgroundColor: '#29bf12',
                    },
                }}
                textStyle={{
                    left: {
                        color: '#FFF',
                        marginHorizontal: 5,
                        fontSize: 16
                    },
                    right: {
                        color: '#FFF',
                        marginHorizontal: 5,
                        fontSize: 16
                    },
                }}
                timeTextStyle={{
                    left: {
                        margin: 7.5,
                        fontSize: 10,
                        textAlign: 'right'
                    },
                    right: {
                        margin: 7.5,
                        fontSize: 10,
                        textAlign: 'right'
                    }
                }}
            />
        );
    }

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>
                    <Icon type="material-community" name="send-circle" color="#29bf12" size={40} style={{ marginTop: 4, marginBottom: 2, marginRight: 8 }} />
                </View>
            </Send>
        )
    }

    const scrollToBottomComponent = () => {
        return (
            <View>
                <Icon type="font-awesome" name="angle-double-down" color="#333" size={22} style={{ marginTop: 4, marginBottom: 2, marginRight: 8 }} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{ padding: 7.5, paddingLeft: 10, width: 'auto', backgroundColor: '#E6E6E6', marginTop: 15, borderRadius: 12.5 }}>
                <View style={{ diplay: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ borderRadius: 25 }}>
                        <Avatar
                            rounded
                            source={{
                                uri: profilePhotos,
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

                onSend={messages => onSend(messages)}
                user={{
                    _id: userType, userSender: senderEmail, userTarget: targetEmail
                }}
                renderBubble={renderBubble}
                renderSend={renderSend}
                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}
                isLoadingEarlier={true}
                style={{ borderWidth: 3, alignItems: 'stretch' }}
                renderAvatar={null}
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
