import React, { useState, useEffect } from 'react';
import { Text, View, Button, Pressable, Image, SafeAreaView, ScrollView, Alert, ImageBackground } from 'react-native';

import Scan from './components/Scan';
import RecipeView from './components/RecipeView';
import NewsView from './components/NewsView';

import styles from './stylesFolder/style_main';

import barcode from './assets/icons/barcode.png';
import squares from './assets/icons/four-black-squares.png';
import home from './assets/icons/home.png';
import list from './assets/icons/list.png';
import fridge from './assets/icons/fridge.png';

export default function App() {
  const [showMain, setShowMain] = useState(0);

  function ToolBar (props) {
    return(
      <View style={styles.toolBarContainer}>
        <View style={styles.toolbar}> 
          <View style={(props.current == 0) ? styles.circle : styles.noCircle}>
            <Pressable onPress={()=>setShowMain(0)} style={styles.create_button}>
              <Image style={styles.toolIcon} source={home} alt={"Ingredients"} tintColor="white"/>
            </Pressable>
          </View>
          <View style={(props.current == 2) ? styles.circle : styles.noCircle}>
            <Pressable onPress={()=>setShowMain(2)} style={styles.create_button}>
              <Image style={styles.toolIcon} source={squares} alt={"Recipes"} tintColor="white"/>
            </Pressable>
          </View>
          <View style={(props.current == 3) ? styles.circle : styles.noCircle}>
            <Pressable onPress={()=>setShowMain(3)} style={styles.create_button}>
              <Image style={styles.toolIcon} source={list} alt={"Recipes"} tintColor="white"/>
            </Pressable>
          </View>
          <View style={(props.current == 1) ? styles.circle : styles.noCircle}>
            <Pressable onPress={()=>setShowMain(1)} style={styles.create_button}>
              <Image style={styles.toolIcon} source={barcode} alt={"Main"} tintColor="white"/>
            </Pressable>
          </View>
        </View> 
      </View>
    )

  }
  if ( showMain == 0) {
    return (
      <View style={styles.container}>
        <ImageBackground 
      source={fridge}
      style={{
        backgroundColor: 'grey',
        width: '100%', // applied to Image
        height: '100%' 
      }}
      imageStyle={{
        resizeMode: 'contain' // works only here!
      }}>
        <NewsView/>
        <ToolBar current={0}/>
      </ImageBackground>
      </View>
    )
  }
  if ( showMain == 1) {
    return (
      <View style={styles.container}>
      </View>
    )
  }
  if ( showMain == 2) {
    return (
      <View style={styles.container}>
        <ToolBar current={2}/>
      </View>
    )
  }
  if ( showMain == 3) {
    return (
      <View style={styles.container}>
        <ImageBackground 
      source={fridge}
      style={{
        backgroundColor: 'grey',
        width: '100%', // applied to Image
        height: '100%' 
      }}
      imageStyle={{
        resizeMode: 'contain' // works only here!
      }}>
        <RecipeView/>
        <ToolBar current={3}/>
      </ImageBackground> 
      </View>
    )
  }
}