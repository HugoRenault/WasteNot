import React, { useState, useEffect } from 'react';
import { Text, View, Button, Pressable, Image, SafeAreaView, ScrollView, Alert } from 'react-native';

import IngredientsMains from './components/IngredientsMains';
import RecipeView from './components/RecipeView';

import styles from './stylesFolder/style_main'

export default function App() {
  const [showMain, setShowMain] = useState(0);

  function ToolBar () {
    return(
      <View style={styles.toolbarContainer}> 
      <View>
            <Pressable onPress={()=>setShowMain(1)} style={styles.create_button}><Text style={styles.button_text}>Ingrédients</Text></Pressable>
      </View>
      <View>
            <Pressable onPress={()=>setShowMain(2)} style={styles.create_button}><Text style={styles.button_text}>Recipes</Text></Pressable>
      </View>
      <View>
            <Pressable onPress={()=>setShowMain(0)} style={styles.create_button}><Text style={styles.button_text}>Main</Text></Pressable>
      </View>
    </View> 
    )

  }

  if ( showMain == 1) {
    return (
      <View style={styles.container}>
        <IngredientsMains style={{flex:5, backgroundColor: 'red'}}/>
        <ToolBar style={{flex:1, backgroundColor: 'yellow'}}/>
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