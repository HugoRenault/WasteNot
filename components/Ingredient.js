// basic view w/ ingredient name and/or pic

import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import styles from '../stylesFolder/style_ingredientsMain.js'

export default function Ingredient (props) {
  return (
    <View style={styles.ingredient_container} key={props.product.id}>   
      <Image
        style={styles.tinyLogo}
        source={{
          uri: props.product.image,
        }}
      />       
      <Text style={styles.ingredient_name}>{props.product.name}</Text>
    </View>
  )
}