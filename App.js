import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";

import { Provider } from './src/components/Context/Context';

import Login from './src/components/Login/Login';
import Register from './src/components/Register/Register';

import ClientCode from './src/components/ClientCode/ClientCode';
import Exercise from './src/components/Exercise/Exercise';
import MyTrainings from './src/components/MyTrainings';

import Myclients from './src/components/Preparador/Myclients';
import Preparador from './src/components/Preparador/preparador';

/* Chat */
import Contacts from './src/components/Chat/Contacts';
import ChatScreen from './src/components/Chat/ChatScreen';

import firebase from "firebase/app";


export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator options="false" screenOptions={{ headerShown: true }}>
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name="ClientCode" component={ClientCode} />
            <Stack.Screen name="MyTrainings" component={MyTrainings} />
            <Stack.Screen name="Exercise" component={Exercise} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="MyClients" component={Myclients} />
            <Stack.Screen name="Preparador" component={Preparador} />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name="Contacts" component={Contacts} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
          </Stack.Group>

        </Stack.Navigator>

        <FlashMessage position="top" />
      </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

});
