import { View, Text,TouchableOpacity, ScrollView} from 'react-native';
import React,{useState} from 'react';


const weekDays = [
  "MONDAY","TUESDAY","WEDNSDAY","THURSDAY","FRIDAY"
  ]


export default function HeaderTab() {
const [activeTab,setActiveTab] = useState('MONDAY');

  return (
    <View style={{flexDirection:'row',alignSelf:'center',flex:0.1}}>
      <ScrollView horizontal={true}>
        {weekDays.map((item,index) => (
           <HeaderButton text={weekDays[index]} 
           activeTab={activeTab}
           setActiveTab={setActiveTab}
            />
        ))}
      </ScrollView>
      

    </View>
  );
}

const HeaderButton = (props) => (
  <View>
    <TouchableOpacity style={{
      backgroundColor:props.activeTab === props.text ? 'black':'white' ,
      paddingVertical:6,
      paddingHorizontal:16,
      borderRadius:30
    }}
    onPress={() => props.setActiveTab(props.text)}
    >
      <Text style={{
        color:props.activeTab === props.text ? 'white': 'black',
        fontSize:15,
        fontWeight:"900",
      }}>{props.text}</Text>
    </TouchableOpacity>
  </View>  
)