// Views in main page

import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import styles from '../stylesFolder/style_home'

export default function NewsView() {
  function Alert(props) {
    return(
      <View style={styles.newsContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    )
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Alert title={'Dishes available'} text={'24 easy dishes easy and fast to do !'}/>
      <Alert title={'How much time before running errands again ?'} text={'You have about 3 weeks until you run out of food'}/>

    </ScrollView>
  )
}

