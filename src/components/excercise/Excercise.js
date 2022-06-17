import { View, Text,StyleSheet, ScrollView, TouchableOpacity,SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown'
import { Checkbox, Surface, TextInput,Chip } from 'react-native-paper';



const weekDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const weekDaysACT = ["Monday","Wednesday","Friday",];

const toDO = [
  {
    name:"Pres banca",reps:"3x(6-8)"
  },
  {
    name:"Pull up",reps:"3x(5-7)"
  },
  {
    name:"Burpees",reps:"4x(2-4)"
  },
];



export default function Excercise() {
  const [checked1, setChecked1] = useState();
  const [checked2, setChecked2] = useState();
  const [checked3, setChecked3] = useState();



  return (
    <View style={{flex:4}}>

      <SafeAreaView style={{flex:1}}>
        <DayChips />
      </SafeAreaView>

      <View style={{flex:1}}>
        <Text style={styles.mainTitle}>CHEST</Text>
      </View>

      <View style={{flex:2,bottom:40}}>

       <ScrollView showsVerticalScrollIndicator={false}>

         <View style={{alignItems:'center'}}>

          <Text style={styles.title}>{toDO[0].name}{toDO[0].reps}</Text>

          <Checkbox
          status={checked1 ? 'checked':'unchecked'}
          onPress={() => setChecked1(!checked1)}
          />
         <GroupList />

         <Text style={styles.title}>{toDO[1].name}{toDO[1].reps}</Text>

         <Checkbox 
         status={checked2 ? 'checked':'unchecked'}
         onPress={() => setChecked2(!checked2)}/>
         <GroupList />
         
         <Text style={styles.title}>{toDO[2].name}{toDO[2].reps}</Text>
         <Checkbox 
         status={checked3 ? 'checked':'unchecked'}
         onPress={() => setChecked3(!checked3)}/>

         <GroupList />

         <SendButton />
         </View>
      
      </ScrollView>
      </View>
      
    </View>
  );
}


//barra desplegable
const DropDown = () => {
  return(
  <View style={{flex:0.5,marginTop:70}}>       
        <SelectDropdown data={weekDays} 
        onSelect={(selectedItem, index) => { 
        //console.log(selectedItem,index)
        }}
        />
    </View>
  )
}

const DayChips = () =>{
  return(
    <View style={{marginTop:60,flexDirection:'row'}}>
      {weekDaysACT.map((item, index) => (
        <Chip 
        icon="calendar-today" 
        onPress={()=> console.log('hi')}
        textStyle={{ color: 'orange', fontSize: 20 }} 
        style={{backgroundColor:'red'}}
        >{item}</Chip>

      ))}
    </View>
  )
}

//agrupar demas elementos
const GroupList = () => {
return(
  <View>
    <TopBar />
    <IndividualList />
    <IndividualList />
    <IndividualList />
  </View>
)
}

//indicador en texto de reps y kg
const TopBar = () => {
  return(
    <View style={{flexDirection:'row'}}>
  <Surface
  style={styles.surface}
  >
    <Text>REPS</Text>
  </Surface>
  <Surface 
  style={styles.surface}
  >
    <Text>KG</Text>
  </Surface>
  </View>
  )
}

//lista de inputs
const IndividualList = () => {
  return(
  <View style={{flexDirection:'row',marginTop:10}}>
      <TextInput style={styles.textInput} />
      <TextInput style={styles.textInput} />
    </View>
  )
}


const SendButton = () => {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => sendData()} >
        <Text>SEND</Text>
      </TouchableOpacity>
    </View>
  )
}

function sendData(){
    console.log("ENVIA");
}

/*const Prova = () => (
  <SafeAreaView >
    <SectionList
        sections={newTaskData}
        renderItem={({item})=>(
            <Text style={styles.taskItem}>{item.task}</Text>
        )}
        renderSectionHeader={({section})=>(
          <Text style={styles.title}>{section.title}</Text>
        )}
        keyExtractor={item=>item.id}
        stickySectionHeadersEnabled
      />
  </SafeAreaView>
);
*/

const styles = StyleSheet.create({
  mainTitle:{
    fontSize:40,
    textAlign:'center'
  },
  title:{
    fontSize:25,
    textAlign:'center'
  },
  textInput:{
    width:120,
    flexDirection:'row',
    marginLeft:20,
    right:10,
    marginBottom:10
  },
  button:{
    backgroundColor:'#96FE5E',
    borderRadius:5,
    alignItems:'center',
    padding:20,
    width:100,
    marginTop:10 
  },
  surface:{
    width:140,
    fontWeight:'600',
    height:30,
    alignItems:'center',
    backgroundColor:'#96FE5E',
    elevation:4,
    
  }

});