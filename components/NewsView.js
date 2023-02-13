// Views in main page

import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {React, useState, useEffect} from 'react'
import styles from '../stylesFolder/style_home'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function NewsView() {
  const [nb, setNb] = useState(0);


  function Alert(props) {
    return(
      <View style={styles.newsContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    )
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@ing')
      let a = jsonValue != null ? JSON.parse(jsonValue) : null
      setNb(a.length);
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Alert title={nb + ' Ingredients left !'} text={nb+' ingredients left in the fridge'}/>
      <Alert title={'How much time before running errands again ?'} text={'You have about 3 weeks until you run out of food'}/>
    </ScrollView>
  )
}

