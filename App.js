import React, { useState, useEffect } from 'react';
import { Text, View, Button, Pressable, Image, SafeAreaView, ScrollView, Alert } from 'react-native';

import Scan from './components/Scan';
import RecipeView from './components/RecipeView';

import styles from './stylesFolder/style_main';

import barcode from './assets/icons/barcode.png';
import squares from './assets/icons/four-black-squares.png';
import home from './assets/icons/home.png';
import list from './assets/icons/list.png';

export default function App() {
  const [showMain, setShowMain] = useState(0);

  function ToolBar () {
    return(
      <View style={styles.toolBarContainer}>
        <View style={styles.toolbar}> 
          <View>
            <Pressable onPress={()=>setShowMain(0)} style={styles.create_button}>
              <Image style={styles.toolIcon} source={home} alt={"Ingredients"} tintColor="white"/>
            </Pressable>
          </View>
          <View>
            <Pressable onPress={()=>setShowMain(2)} style={styles.create_button}>
              <Image style={styles.toolIcon} source={squares} alt={"Recipes"} tintColor="white"/>
            </Pressable>
          </View>
          <View>
            <Pressable onPress={()=>setShowMain(2)} style={styles.create_button}>
              <Image style={styles.toolIcon} source={list} alt={"Recipes"} tintColor="white"/>
            </Pressable>
          </View>
          <View>
            <Pressable onPress={()=>setShowMain(1)} style={styles.create_button}>
              <Image style={styles.toolIcon} source={barcode} alt={"Main"} tintColor="white"/>
            </Pressable>
          </View>
        </View> 
      </View>
    )

  }

  if ( showMain == 1) {
    return (
      <View style={styles.container}>
        <Scan/>
        <ToolBar/>
      </View>
    )
  }
  if ( showMain == 2) {
    return (
      <View style={styles.container}>
        <RecipeView/>
        <ToolBar/>
      </View>
    )
  }
  if ( showMain == 0) {
    return (
      <ToolBar/>
    )
  }
}
