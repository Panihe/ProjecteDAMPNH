import { View, Text } from 'react-native'
import React,{useState} from 'react'
import { Searchbar } from 'react-native-paper'

export default function SearchBar() {
     const [searchQuery, setSearchQuery] = useState('');


    const onChangeSearch = query => setSearchQuery(coses[1]);
    
    const coses =[
        "UNO","DOS","TRES","CUATRO"
    ]

  return (
    <View>
     <Searchbar
     style={{width:300}}
     placeholder="Search"
     onChangeText={onChangeSearch}
     value={searchQuery}
     />
    </View>
  )
}