import axios from "axios";
import { View, Text, StyleSheet, ScrollView, Button, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Surface, TextInput } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// const toDO = [
//   {
//     name: "Pres banca", reps: "3x(6-8)"
//   },
//   {
//     name: "Pull up", reps: "3x(5-7)"
//   },
//   {
//     name: "Burpees", reps: "4x(2-4)"
//   },
// ];

export default function Exercise() {
  const route = useRoute();
  const navigation = useNavigation();
  const [exercises, setExercises] = useState([]);
  let IdUser = route.params.IdUser;
  let IdSession = route.params.IdSession;

  useEffect(() => {
    //getExercises();
    getExercises();
  }, [])

  const getExercises = () => {
    let data = JSON.stringify({

      IdUser: IdUser,

      IdSession: IdSession

    })
    console.log(data);
    axios
      .post("https://determined-faraday.82-223-16-225.plesk.page/databases/client_get_exercises.php", data)
      .then(function (response) {
        console.log(response.data);
        setExercises(response.data);
      })
      .catch(function (error) {
        console.log("Petición fallida");
      });

  }

  /* const exercises = [
    { title: 'Squat', series: '3', reps: '10-12' },
    { title: 'DeadWeight', series: '3', reps: '10-12' },
    { title: 'Push-ups', series: '3', reps: '10-12' },
  ] */

  return (
    <View style={{ flex: 4, backgroundColor: '#FFF' }}>


      <View style={styles.imageHeaderBox}>
        <Image style={styles.imageHeader} source={require('../../assets/woman_training_squad.jpg')} />
      </View>

      <View style={styles.sessionBox}>
        <View style={styles.sessionTitleBox}>
          <Text style={styles.sessionTitle}>{route.params.title}</Text>
        </View>
        <View style={styles.exerciseZoneBox}>
          <Text style={styles.exerciseTitle}>LEG DAY</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {exercises.map((element, pos) => {
          return (
            <View key={pos}>
              <View style={styles.exerciseTitleBox}>
                <Text style={styles.exerciseTitle}>{element.name}</Text>
              </View>

              <View style={styles.sectionSessionsExercisesBox}>
                <View style={styles.sessionsExercisesBox}>
                  <Text style={styles.series}>Series</Text>
                  <Text style={styles.reps}>Reps</Text>
                  <Text style={styles.kg}>Kg</Text>
                </View>
                <View style={styles.lineBox}>
                  <View style={styles.line}>

                  </View>
                </View>
                <View style={styles.numberSeriesRepsBox}>
                  <Text style={styles.numberSeriesBox}>{element.Series}</Text>
                  <Text>{element.Reps}</Text>
                </View>
                <View style={styles.templateSeriesRepsBox}>
                  <GroupList />
                </View>
              </View>
            </View>
          )
        })}

        <View style={styles.buttonSaveBox}>
          <Button style={styles.buttonSave} onPress={() => navigation.navigate('MyTrainings', { id: IdUser })} title="Finish" color="#29bf12" />
        </View>
      </ScrollView>
    </View>
  );
}

//agrupar demas elementos
const GroupList = () => {
  return (
    <View style={styles.templateSeriesRepsBox}>
      {/*  <TopBar /> */}
      <IndividualList />
      <IndividualList />
      <IndividualList />
    </View>
  )
}

//lista de inputs
const IndividualList = () => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 10 }}>
      <TextInput style={styles.textInput} theme={{ colors: { primary: 'green', underlineColor: 'transparent' } }} />
      <TextInput style={styles.textInput} theme={{ colors: { primary: 'green', underlineColor: 'transparent' } }} />
    </View>
  )
}

const goBack = () => {
  navigation.navigate('MyTrainings', { IdUser: IdUser });

  const message = () => {
    /* HERE WE GONE SHOW OUR FIRST MESSAGE */
    showMessage({
      message: "Training has been saved",
      type: "success",
    });
  }
}

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 40,
    textAlign: 'center'
  },
  title: {
    fontSize: 25,
    textAlign: 'center'
  },
  textInput: {
    width: 90,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginLeft: 20,
    right: 10,
    marginBottom: 10,
    borderWidth: 1.75,
    borderColor: '#B4B4B4',
    height: 35
  },
  button: {
    backgroundColor: '#96FE5E',
    borderRadius: 5,
    alignItems: 'center',
    padding: 20,
    width: 100,
    marginTop: 10
  },
  surface: {
    width: 140,
    fontWeight: '600',
    height: 30,
    alignItems: 'center',
    backgroundColor: '#96FE5E',
    elevation: 4,
  },
  imageHeaderBox: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  imageHeader: {
    width: 425,
    height: 275,
  },
  sessionBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 30
  },
  sessionTitleBox: {
    paddingLeft: 32.5,
    paddingRight: 62.5
  },
  exerciseZoneBox: {
    paddingLeft: 62.5,
    paddingRight: 32.5
  },
  sessionTitle: {
    fontSize: 22,
    fontWeight: 500,
    color: '#004b23'
  },
  exerciseTitle: {
    fontSize: 22,
    fontWeight: 300,
    color: '#004b23'
  },
  exerciseTitleBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  exerciseTitle: {
    fontSize: 20
  },
  sessionsExercisesBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    paddingRight: 30,
    paddingBottom: 30,
    paddingLeft: 30,
  },
  lineBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 2.5,
    backgroundColor: '#B4B4B4',
    width: 350,
    flexDirection: 'row',
    justifyContent: 'center',
    top: -25
  },
  series: {
    fontSize: 16,
    color: '#B4B4B4',
    marginRight: 100
  },
  reps: {
    fontSize: 16,
    color: '#B4B4B4',
    marginRight: 100
  },
  kg: {
    fontSize: 16,
    color: '#B4B4B4',
  },
  numberSeriesRepsBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: -15
  },
  numberSeriesBox: {
    marginLeft: -100,
    marginRight: 120
  },
  templateSeriesRepsBox: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 10
  },
  sectionSessionsExercisesBox: {
    marginBottom: 25
  },
  buttonSaveBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 5,
    marginRight: 30,
    marginBottom: 25
  },
  buttonSave: {
    padding: 90,
  }
});