// View w/ name, stars, rating and fading-in image
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground, Pressable, Linking} from 'react-native'
import React, { useState, useEffect} from 'react'
import {LinearGradient} from  'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';



import styles from '../stylesFolder/style_recipes'

import arrow from '../assets/icons/arrow.png'
import star from '../assets/icons/star.png'
import close from '../assets/icons/close.png'

import rectangle from '../assets/icons/rectangle.png'

import plane from '../assets/icons/moredetails.png'



const API_KEY_SPOONACULAR = '814881a1e93c460d84049f69a2258019'; // api key 
const API_URL_FIND_BY_INGREDIENTS = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY_SPOONACULAR}`; // url


//colors
const dark = '#231F20'; 
const red = '#A05252'


///// PARAMETRIZE /////
var ignorePantry = true
var ranking = 1 // minimize missing ingredients first
var number = 20
///////////////////////


export default function  RecipeView () {
  const [loaded, setIsLoaded] = useState(false) //are recipes loaded? 
  const [dataRecipes, setDataRecipes] = useState([]) //raw recipe data
  const [ingredients, setIngredients] = useState([]) // ingredients from fridge


  const [recipeDetails, setRecipeDetails] = useState()

  const [maximizeIngredient, setMaximizeIngredient] = useState(false)


  const [link, setLink] = useState("")
  
  let params = {
    'url' : API_URL_FIND_BY_INGREDIENTS,
    'ignorePantry' : ignorePantry,
    'ranking' : ranking,
    'number' : number
}


  const getData = async () => { // async storage load data
    try {
      const jsonValue = await AsyncStorage.getItem('@ing')
      const a = jsonValue != null ? JSON.parse(jsonValue) : null
      if (a != null) { // if there are ingredients in fridge
        let arrOfIng = [...ingredients]
        a.forEach(ingredient => arrOfIng.push(ingredient.name)) // for all ingredient only get the name (usable for spoonacular)
        setIngredients(arrOfIng) 
      }
      else { // if no ingredients 
        setIngredients([]) // show no ingredients
      }
      
    } catch(e) {
      console.log(e) // show error
    }
  }

  useEffect(() => { // on load get all ingredients
    getData();
  }, []);

  function buildUrl(params){ // get the url of spoonacular with all corresponding data
    return(
      params.url + '&ingredients=' + ingredients  + '&ignorePantry=' + params.ignorePantry + '&ranking=' + params.ranking + '&number=' + params.number
    )
  }
  const loadRecipes = async() => { // load data from spoonacular
    let response = await fetch(buildUrl(params)) // send request
    let recipesList = await response.json();
    setIsLoaded(true); //make the recipes loaded 
    setDataRecipes(recipesList); //set all raw loaded data
  };
  

  const GetLink = async(id) => { //get 'more info' link from api spoonacular 
    let response = await fetch("https://api.spoonacular.com/recipes/"+ id +"/information?includeNutrition=False&apiKey=3ea3890b95c948f78f365ed1e69b2166") // make request for detailed data
    let response_link = await response.json();
    response_link = response_link.sourceUrl
    setLink(response_link);
  };

  function RecipeDetailsCard(props) { // cards for missing and used ignredients
    return(
      <View style={[styles.newsContainer, {backgroundColor:props.color}]}>
        <Text style={styles.title}>{props.nb} {props.title}</Text>
        {props.text.map((obj) => {
        return(<View><Text style={{color:'white', fontSize:20, marginTop:6,}}>{obj.name.charAt(0).toUpperCase() + obj.name.slice(1)}</Text></View>)
        })}
      </View>
    )
  }

  function RecipeShow(data) { // called when recipe is pressed
    GetLink(data.id) // get link from spoonacular
    setRecipeDetails(data) // set the details from specific recipe
    setMaximizeIngredient(true) // show the details of the recipe 

  }

  function RecipeDetails(props) { //Recipe details (used ingredient, missing ingredients, link.. )
    const strSizeTreshold = 18;
    return (
      <View style={styles.recipeDetailsContainer}>
        <ImageBackground 
              source={{uri:props.img}} style={styles.detailsLogo}>
                <LinearGradient 
              colors={['#00000000', dark]} 
              start={{ x: 1, y: 1}}
              end={{ x: 0, y: 1 }}
              style={styles.linearContainer}>
              <Pressable onPress={()=>setMaximizeIngredient(false)}><Image source={close} style={styles.smallClose}/></Pressable>
              <ImageBackground source={rectangle} style={styles.roundedView}>
                <View style={{flexGrow: 1, flexDirection: 'row',alignSelf:'center'}}>
                  <Text style={[styles.recipeDetailsTitle]}>
                    {props.title.length < strSizeTreshold ? props.title : props.title.slice(0,strSizeTreshold)+"..."}
                  </Text>
                </View>
              </ImageBackground>
              </LinearGradient>
            </ImageBackground>
        <View style={{flex:2.25, paddingBottom:80}}>
          <ScrollView contentContainerStyle={styles.scrollRecipeDetails}>
            <RecipeDetailsCard title={'Used ingredients'} color={dark} text={props.usedIngredients}  nb={props.usedNb}/>
            <RecipeDetailsCard title={'Missing ingredients'} color={dark} text={props.missingIngredients} nb={props.missingNb}/>
            <Pressable onPress={() => Linking.openURL(link)}>
                <Image source={plane} style={{height:100, width: 200,marginTop:35}}/>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    )
  }
  
  
  function RecipeCard(props) { // each little recipe card
    return(

      // on press then show the recipe Details
      <Pressable onPress={()=>RecipeShow(props)}>
      <View style={styles.newsContainerNoPadding}>
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
              colors={['#00000000', '#00000000','#231F20']}
              start={{ x: 1.5, y: 1.5}}                       // Shade of recipe image 
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


  if(maximizeIngredient && loaded){ // if recipes are loaded and we want to maximize a recipe 
    return(
      <RecipeDetails title={recipeDetails.title} img={recipeDetails.img} usedIngredients={recipeDetails.usedIngredients} missingIngredients={recipeDetails.missingIngredients} usedNb={recipeDetails.usedNb} missingNb={recipeDetails.missingNb} />
    )
  }
  else if(loaded){ // if recipes are loaded but we aren't maximizing a recipe 
    if (dataRecipes.length<1) {
      return(
        <View style={styles.scrollContainer}>
                <View style={[styles.newsContainerNoPadding, {marginTop:150}]}>
        <Text style={{
          color:"white",
          fontSize:36,
          marginTop:125,
          marginBottom:125,
          alignSelf: 'center'
        }}>No ingredients</Text>
        </View>
        </View>
      )
    }
    else {
      return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {dataRecipes.map((obj) => { // for each recipe 
          return(<RecipeCard title={obj.title} id={obj.id} img={obj.image} reviews={obj.likes} usedIngredients={obj.usedIngredients} missingIngredients={obj.missedIngredients} usedNb={obj.usedIngredientCount} missingNb={obj.missedIngredientCount}/>)
          })}
        </ScrollView>
      );
    }
    
  }
  else if(loaded == false){ //if ingredients not loaded 
    loadRecipes(); //then load them
    return(
      <View style={styles.scrollContainer}>
        <View style={[styles.newsContainerNoPadding, {marginTop:150}]}>
          <Text style={{
          color:"white",
          fontSize:36,
          marginTop:125,
          marginBottom:125,
          alignSelf: 'center'
          }}>Loading...</Text>

          </View>
        </View>
      );
  }
}
