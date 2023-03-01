import React, { useState, useEffect } from 'react';
import { Text, View, Button, Pressable, Image, SafeAreaView, ScrollView, Alert, ImageBackground } from 'react-native';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications

import Scan from './components/Fridge';
import RecipeView from './components/Recipes';
import NewsView from './components/News';

import styles from './stylesFolder/style_app';

import barcode from './assets/icons/barcode.png';
import home from './assets/icons/home.png';
import list from './assets/icons/list.png';
import fridge from './assets/icons/fridge.png';

export default function App() {
  const [showMain, setShowMain] = useState(0); //current view number

  function ToolBar (props) { // toolbar
    // in props : current number ; for each element if corresponding number then show circle else no circle
    return(
      <View style={styles.toolBarContainer}>
        <View style={styles.toolbar}> 
          <View style={(props.current == 0) ? styles.circle : styles.noCircle}> 
            <Pressable onPress={()=>setShowMain(0)} style={styles.create_button}>
              <Image style={styles.toolIcon} source={home} alt={"Ingredients"} tintColor="white"/>
            </Pressable>
          </View>
          <View style={(props.current == 1) ? styles.circle : styles.noCircle}>
            <Pressable onPress={()=>setShowMain(1)} style={styles.create_button}>
              <Image style={styles.toolIcon} source={squares} alt={"Recipes"} tintColor="white"/>
            </Pressable>
          </View>
          <View style={(props.current == 2) ? styles.circle : styles.noCircle}>
            <Pressable onPress={()=>setShowMain(2)} style={styles.create_button}>
              <Image style={styles.toolIcon} source={list} alt={"Recipes"} tintColor="white"/>
            </Pressable>
          </View>
        
        </View> 
      </View>
    )

  }
  if ( showMain == 0) { // newsview 
    return (
      <View style={styles.container}>
        <ImageBackground 
        source={fridge}
        style={{backgroundColor: 'grey',width: '100%', height: '100%'}}
        imageStyle={{resizeMode: 'contain'}}>
          <NewsView/>
          <ToolBar current={0}/>
        </ImageBackground>
      </View>
    )
  }
  if ( showMain == 1) { // ingredients view
    return (
      <View style={styles.container}>
        <ImageBackground 
        source={fridge}
        style={{backgroundColor: 'grey', width: '100%',height: '100%'}}
        imageStyle={{resizeMode: 'contain'}}>
          <Scan/>
          <ToolBar current={1}/>
        </ImageBackground>
      </View>

    )
  }
  if ( showMain == 2) { // recipes view
    return (
      <View style={styles.container}>
        <ImageBackground 
        source={fridge}
        style={{backgroundColor: 'grey',width: '100%',height: '100%'}}
        imageStyle={{resizeMode: 'contain'}}>
          <RecipeView/>
          <ToolBar current={2}/>
        </ImageBackground> 
      </View>
    )
  }
}
