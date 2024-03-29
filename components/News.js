// main page with info about the fridge

import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import {React, useState, useEffect} from 'react'
import styles from '../stylesFolder/style_news'
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../assets/logo.png';



export default function NewsView() {
  const [nb, setNb] = useState(0); // number of ingredients


  const getData = async () => { // get the ingredient list to get number of ingredients
    try {
      const jsonValue = await AsyncStorage.getItem('@ing')
      let a = jsonValue != null ? JSON.parse(jsonValue) : null
      setNb(a.length);
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => { // on load
    getData(); // request data
  }, []);


  function Alert(props) { //small boxes with info on fridge
    return(
      <View style={styles.newsContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text1} <Text style={[{fontWeight:'bold'}]}>{props.text2}</Text>{props.text3}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    )
  }
  return (
    
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        style={styles.logo}
        source={logo}/>
      <Alert title={'Bienvenue !'} text1={"Bienvenue sur"} text2={"WasteNot"}text3={", l'application qui réduira votre gaspillage alimentaire"}/>
      <Alert title={nb + ' ingrédients restants !'} text={'Il vous reste '+nb+ ' ingrédients dans le frigo'} />
    </ScrollView>

  )
}

