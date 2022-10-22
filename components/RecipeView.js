// View w/ name, stars, rating and fading-in image

import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, Pressable} from 'react-native'
import React, { useState} from 'react'
import {LinearGradient} from  'expo-linear-gradient'


import styles from '../stylesFolder/style_recipes'

import arrow from '../assets/icons/arrow.png'
import star from '../assets/icons/star.png'
import close from '../assets/icons/close.png'

import rectangle from '../assets/icons/rectangle.png'




const API_KEY_SPOONACULAR = '3ea3890b95c948f78f365ed1e69b2166';
const API_URL_FIND_BY_INGREDIENTS = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY_SPOONACULAR}`;

const dark = '#231F20';
const red = '#A05252'


///// PARAMETRIZE /////
var ingredients_example = 'flour,eggs,apple'
var ignorePantry = true
var ranking = 2 // minimize missing ingredients first
var number = 1
///////////////////////


export default function  RecipeView () {
  const [loaded, setIsLoaded] = useState(false)
  const [dataRecipes, setDataRecipes] = useState([])

  const [recipeDetails, setRecipeDetails] = useState()

  const [show, setShow] = useState(false)


  function buildUrl(params){
    return(
      params.url + '&ingredients=' + params.ingredients + '&ignorePantry=' + params.ignorePantry + '&ranking=' + params.ranking + '&number=' + params.number
    )
  }
  
  let params = {
      'url' : API_URL_FIND_BY_INGREDIENTS,
      'ingredients' : ingredients_example,
      'ignorePantry' : ignorePantry,
      'ranking' : ranking,
      'number' : number
  }

  const loadRecipes = async() => {
    let response = await fetch(buildUrl(params))
    let recipesList = await response.json();
    setIsLoaded(true);
    console.log(recipesList)
    setDataRecipes(recipesList);
    console.log(recipesList)
  };

  function RecipeDetailsCard(props) {
    return(
      <View style={[styles.newsContainer, {backgroundColor:props.color}]}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    )
  }


  function RecipeShow(data) {
    setShow(true)
    setRecipeDetails(data)
  }

  function RecipeDetails(props) {
    return (
      <View style={styles.recipeDetailsContainer}>
        <ImageBackground 
              source={{uri:props.img}} style={styles.detailsLogo}>
                <LinearGradient 
              colors={['#00000000', dark]} 
              start={{ x: 1, y: 1}}
              end={{ x: 0, y: 1 }}
              style={styles.linearContainer}>
              <Pressable onPress={()=>setShow(false)}><Image source={close} style={styles.smallClose}/></Pressable>
              <ImageBackground source={rectangle} style={styles.roundedView}>
                <Text style={styles.recipeDetailsTitle}>{props.title}</Text>
              </ImageBackground>
              </LinearGradient>
            </ImageBackground>
        <View style={{flex:3}}>
          <ScrollView contentContainerStyle={styles.scrollRecipeDetails}>
            <RecipeDetailsCard title={'Used ingredients'} color={dark}/>
            <RecipeDetailsCard title={'Missing ingredients'} color={dark}/>
          </ScrollView>
        </View>
      </View>
    )
  }
  
  
  function Recipe(props) {
    return(
      <Pressable onPress={()=>RecipeShow(props)}>
      <View style={styles.newsContainer}>
        <View style={styles.recipeLogoContainer}>
          <View style={styles.recipeCard}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.starContainer}>
            <Image source={star} style={styles.smallStar}/>
            <Text style={{color:'white', marginLeft:10, fontSize:20}}>{props.reviews}</Text>
            </View>
          </View>
          <ImageBackground 
              source={{uri:props.img}} style={styles.logo}>
                <LinearGradient 
              colors={['#00000000', '#231F20']} 
              start={{ x: 1.005, y: 1 }}
              end={{ x: 0, y: 1 }}
              style={styles.linearContainer}>
              </LinearGradient>
              <Image source={arrow} style={styles.smallArrow}/>
            </ImageBackground>
        </View>
      </View>
      </Pressable>
    )
  };
  if(show && loaded){
    return(
      <RecipeDetails title={recipeDetails.title} img={recipeDetails.img}/>
    )
  }
  else if(loaded){
    console.log(dataRecipes)
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {dataRecipes.map((obj) => {
        return(<Recipe title={obj.title} text={'text'} key={obj.id} img={obj.image} reviews={obj.likes}/>)
        })}
      </ScrollView>
    );
  }
  else if(loaded == false){
    loadRecipes(); // only load if not loaded yet
    return(<Text>Loading...</Text>);
  }
}
